import {
    ChatGod,
    ChatGodManager,
    updateFromFrontend,
    randomVoiceStyle,
} from "@sarxina/chatgod-js";
import type http from "http";
import { WSManagerVN } from "./WSManagerVN.js";
import type {
    CharacterData,
    ChoiceData,
    LocationData,
    VNMode,
    VNStateData,
} from "../../common/types.js";

// --- Decorators (TC39 stage-3) ---

// Method decorator: wraps the method so that calling it also triggers
// onStateChange() on the instance. Mirrors chatgod-js's updateGodState.
function updateVNState<This extends { onStateChange: () => void }, Args extends unknown[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
): (this: This, ...args: Args) => Return {
    return function (this: This, ...args: Args): Return {
        const result = originalMethod.call(this, ...args);
        this.onStateChange();
        return result;
    };
}

interface FrontendBinding {
    wsSubject: string;
    methodName: string;
}

// --- Choice ---

class Choice {
    private text: string;
    private keyWord: string;
    private numVotes: number;
    onStateChange: () => void;

    constructor(text: string, keyWord: string, onStateChange: () => void) {
        this.text = text;
        this.keyWord = keyWord;
        this.numVotes = 0;
        this.onStateChange = onStateChange;
    }

    serialize = (): ChoiceData => {
        return {
            text: this.text,
            keyWord: this.keyWord,
            numVotes: this.numVotes,
        };
    };

    setText = (text: string): void => {
        this.text = text;
    };

    @updateVNState
    voteForChoice(): void {
        this.numVotes += 1;
    }

    resetVotes(): void {
        this.numVotes = 0;
    }

    getkeyWord = (): string => {
        return this.keyWord;
    };

    setKeyWord = (keyWord: string): void => {
        this.keyWord = keyWord;
    };
}

// --- Character ---

// Custom ChatGod that handles character information
class Character extends ChatGod {
    private name: string;
    private inScene: boolean;

    constructor(
        keyWord: string,
        onStateChange: () => void,
        isSpeaking: boolean = false,
        latestMessage: string = "Added a new character"
    ) {
        super(keyWord, onStateChange, isSpeaking, latestMessage);
        this.name = "Sarxina";
        this.inScene = false;
        this.image = "SarxinaFront.png";
    }

    getName = (): string => {
        return this.name;
    };

    getInScene = (): boolean => {
        return this.inScene;
    };

    override serialize = (): CharacterData => {
        return {
            ...super.serialize(),
            name: this.name,
            inScene: this.inScene,
        };
    };

    // Perform a full or partial in place update of the character
    update = (newData: CharacterData): void => {
        // Start with data that can be done safely in place
        this.image = newData.image;
        this.name = newData.name;
        this.keyWord = newData.keyWord;
        this.inScene = newData.inScene;

        this.setLatestMessage(newData.latestMessage);
        this.toggleSpeakingState(newData.isSpeaking);
        this.setTTSSettings(newData.ttsVoice, newData.ttsStyle);
        this.setCurrentChatter(newData.currentChatter);
    };
}

// --- CharacterManager ---

// Manages the characters and their state updates
// Uses the @sarxina/chatgod-js package
class CharacterManager extends ChatGodManager<Character> {
    static override ChatGodClass = Character;
    override managerContext: VNManager;

    constructor(_server: http.Server, managerContext: VNManager) {
        // Pass null so ChatGodManager doesn't create a WSManager
        // (we use VNManager's wsManager instead, set in createInitialGods)
        super(null, managerContext);
        this.managerContext = managerContext;
        // Defer binding registration until after construction completes so
        // stage-3 decorator initializers have populated __frontendBindings.
        queueMicrotask(() => {
            this.registerAllFrontendListeners(this.__frontendBindings);
        });
    }

    override emitChatGods(): void {
        this.managerContext.emitVNState();
    }

    protected override createChatGod(keyword: string): Character {
        const character = new Character(
            keyword,
            this.managerContext.emitVNState.bind(this.managerContext)
        );
        character.onChatterChange = (newChatter: string): void => {
            const [voice, style] = randomVoiceStyle();
            character.setTTSSettings(voice, style);
            this.twitchChatManager.say(
                `${newChatter} is now in control of ${character.getName()}!`
            );
        };
        character.onQueueJoin = (chatter: string): void => {
            this.twitchChatManager.say(
                `${chatter} has joined the queue for ${character.getName()}!`
            );
        };
        return character;
    }

    override serializeChatGods = (): CharacterData[] => {
        return this.chatGods.map((g) => g.serialize());
    };

    override createInitialGods(): void {
        this.wsManager = this.managerContext.wsManager;
        this.chatGods = [
            this.createChatGod(this.getKeyword(1)),
            this.createChatGod(this.getKeyword(2)),
            this.createChatGod(this.getKeyword(3)),
        ];
    }

    // Override frontend listener registration to register to VNManager's wsManager instead
    override _registerFrontendListener(wsSubject: string, methodName: string): void {
        const method = (this as unknown as Record<string, unknown>)[methodName];
        if (typeof method !== "function") {
            console.warn(`Attempted to register ${methodName} but it is not a function`);
            return;
        }
        this.managerContext.wsManager.registerFrontendListener(wsSubject, method.bind(this));
    }

    // Directly set all the characters in the manager from loaded data
    _setCharacters(characters: CharacterData[]): void {
        this.chatGods = characters.map((character) => {
            const newCharacter = this.createChatGod(character.keyWord);
            newCharacter.update(character);
            return newCharacter;
        });
    }

    // Override speaking to set the VN's current speaker
    // as well as only allow active characters to speak
    override speakMessage(chatGod: Character, message: string): void {
        // Speak only if the god is in the scene
        if (chatGod.getInScene()) {
            this.managerContext.state.setCurrentSpeaker(chatGod.getName());
            this.managerContext.state.setCurrentText(message);
            super.speakMessage(chatGod, message);
        }
    }

    sendHowToJoin(): void {
        const charLines = this.chatGods.map((c) => `${c.getName()} - ${c.keyWord}`).join(" | ");
        const msg = `Type !join<code> to queue for a character! Characters: ${charLines} | When choices appear on screen, type the command shown to vote!`;
        this.twitchChatManager.say(msg);
    }

    // After processing chat gods messages
    // Check to see if message qualifies as a choice vote
    override processMessage(message: string, chatter: string): void {
        if (message.trim() === "!howtojoin") {
            this.sendHowToJoin();
            return;
        }
        this.managerContext.voteByKeyword(message);
        super.processMessage(message, chatter);
    }
}

// --- Location ---

// Manages the game's current location
class Location {
    private name: string;
    private image: string;
    keyWord: string;

    constructor(
        name: string = "classroom",
        image: string = "defaultClassroom.jpg",
        keyword: string = `!location${Date.now()}${Math.floor(Math.random() * 1000)}`
    ) {
        this.name = name;
        this.image = image;
        this.keyWord = keyword;
    }

    update = (data: LocationData): void => {
        this.name = data.name;
        this.image = data.image;
    };

    serialize = (): LocationData => {
        return {
            name: this.name,
            image: this.image,
            keyWord: this.keyWord,
        };
    };
}

// --- VNState ---

// Manages the game's full state
class VNState {
    private currentLocation: string; // The keyword for the location we're at
    private locationOptions: Location[];
    private characters: CharacterManager;
    private currentText: string;
    private currentChoices: Choice[];
    private currentMode: VNMode;
    private currentSpeaker: string;

    managerContext: VNManager;
    onStateChange: () => void;

    constructor(server: http.Server, managerContext: VNManager, onStateChange: () => void) {
        this.locationOptions = [new Location()];
        this.currentLocation = this.locationOptions[0]!.keyWord;
        this.characters = new CharacterManager(server, managerContext);
        this.currentSpeaker = this.characters.chatGods[0]!.getName();
        this.currentText = "The story begins...";
        this.currentChoices = [
            new Choice("First Choice", "!choice1", onStateChange),
            new Choice("Second Choice", "!choice2", onStateChange),
        ];
        this.currentMode = "text";

        this.managerContext = managerContext;
        this.onStateChange = onStateChange;
    }

    // Read
    serialize(): VNStateData {
        return {
            currentLocation: this.currentLocation,
            locationOptions: this.locationOptions.map((loc) => loc.serialize()),
            characters: this.characters.serializeChatGods(),
            currentText: this.currentText,
            currentChoices: this.currentChoices.map((choice) => choice.serialize()),
            currentMode: this.currentMode,
            currentSpeaker: this.currentSpeaker,
        };
    }

    /** Location CRUD */
    @updateVNState
    addLocation(): void {
        const newLocation = new Location();
        this.locationOptions.push(newLocation);
    }

    // Remove specific location from options
    @updateVNState
    removeLocation(keyWord: string): void {
        this.locationOptions = this.locationOptions.filter((loc) => loc.keyWord !== keyWord);
    }

    @updateVNState
    updateLocation(newData: LocationData): void {
        const locToChange = this.locationOptions.find((loc) => loc.keyWord === newData.keyWord);
        if (locToChange) {
            locToChange.update(newData);
        }
    }

    @updateVNState
    setCurrentLocation(keyword: string): void {
        const locToSet = this.locationOptions.find((loc) => loc.keyWord === keyword);
        if (!locToSet) {
            throw new Error("Tried to set non-existant location");
        }
        this.currentLocation = locToSet.keyWord;
    }

    /** Character CRUD */
    @updateVNState
    addCharacter(): void {
        this.characters.addChatGod({});
    }

    @updateVNState
    updateCharacter(newData: CharacterData): void {
        const charToChange = this.characters.getChatGodByKeyword(newData.keyWord);
        if (charToChange) charToChange.update(newData);
    }

    @updateVNState
    deleteCharacter(keyWord: string): void {
        this.characters.deleteChatGod({ keyWord });
    }

    /** Text CRUD */
    setCurrentText(text: string): void {
        this.currentText = text;
    }

    setCurrentSpeaker(speaker: string): void {
        this.currentSpeaker = speaker;
    }

    /** Choice CRUD */
    @updateVNState
    addChoice(): void {
        const newChoice = new Choice(
            "This is a new choice",
            `!voteChoice${this.currentChoices.length + 1}`,
            this.onStateChange
        );
        this.currentChoices.push(newChoice);
    }

    getAllChoices(): Choice[] {
        return this.currentChoices;
    }

    getAllLocations(): Location[] {
        return this.locationOptions;
    }

    @updateVNState
    updateChoice(choice: ChoiceData): void {
        const choiceToChange = this.getAllChoices().findIndex(
            (c) => c.getkeyWord() === choice.keyWord
        );
        if (choiceToChange >= 0) {
            this.currentChoices[choiceToChange]!.setText(choice.text);
        }
    }

    @updateVNState
    deleteChoice(keyWord: string): void {
        this.currentChoices = this.currentChoices.filter(
            (choice) => choice.getkeyWord() !== keyWord
        );
        // The keyword of choices is set based on index so we need to reset the indices on a deletion
        this.currentChoices.forEach((choice, idx) => choice.setKeyWord(`!voteChoice${idx + 1}`));
    }

    //** Mode CRUD */
    @updateVNState
    setMode(mode: VNMode): void {
        this.currentMode = mode;
        this.currentChoices.forEach((choice) => choice.resetVotes());
    }

    // Directly set all of the locations
    _setLocations(locations: LocationData[]): void {
        const newLocations: Location[] = [];
        for (const location of locations) {
            const newLocation = new Location(location.name, location.image, location.keyWord);
            newLocations.push(newLocation);
        }
        this.locationOptions = newLocations;
    }

    // Directly set all of the characters
    _setCharacters(characters: CharacterData[]): void {
        this.characters._setCharacters(characters);
    }

    sendHowToJoin(): void {
        this.characters.sendHowToJoin();
    }

    _setChoices(choices: ChoiceData[]): void {
        const newChoices: Choice[] = [];
        for (const choice of choices) {
            const newChoice = new Choice(choice.text, choice.keyWord, this.onStateChange);
            newChoices.push(newChoice);
        }
        this.currentChoices = newChoices;
    }

    // Directly set the entire state
    @updateVNState
    setState(state: VNStateData): void {
        // Location
        this._setLocations(state.locationOptions);
        this.currentLocation = state.currentLocation;

        // Characters
        this._setCharacters(state.characters);
        this.currentSpeaker = state.currentSpeaker;

        // Choices
        this._setChoices(state.currentChoices);

        // Mode
        this.setMode(state.currentMode);

        // text
        this.currentText = state.currentText;
    }
}

// --- VNManager ---

// Manages the game
export class VNManager {
    state!: VNState;
    wsManager: WSManagerVN;

    // Filled in at construction time by the @updateFromFrontend initializers.
    // Declared with `declare` so TypeScript knows about the type but doesn't
    // emit a class field that would overwrite the initializer's value.
    declare __frontendBindings?: FrontendBinding[];

    constructor(server: http.Server) {
        console.log("Attempting to start the VNManager");

        this.wsManager = new WSManagerVN(server);
        // Create the state class with the server, this context, and the update callback
        this.state = new VNState(server, this, this.emitVNState.bind(this));

        // Defer until after construction completes so the @updateFromFrontend
        // initializers have populated this.__frontendBindings.
        queueMicrotask(() => {
            this.registerAllFrontendListeners(this.__frontendBindings);
            this.emitVNState();
            console.log("VNManager is now running");
        });
    }

    emitVNState(): void {
        this.wsManager.emitVNState(this.state.serialize());
    }

    getLocationByKeyword = (keyWord: string): Location | undefined => {
        return this.state.getAllLocations().find((loc) => loc.keyWord === keyWord);
    };

    /** Websocket hooks */
    @updateFromFrontend("get-vnstate")
    respondVNState(_data: unknown): void {
        this.emitVNState();
    }

    // Location
    @updateFromFrontend("add-location")
    addLocation(_data: unknown): void {
        this.state.addLocation();
    }

    @updateFromFrontend("remove-location")
    removeLocation(data: { keyWord: string }): void {
        this.state.removeLocation(data.keyWord);
    }

    @updateFromFrontend("update-location")
    updateLocation(data: LocationData): void {
        this.state.updateLocation(data);
    }

    @updateFromFrontend("set-current-location")
    setCurrentLocation(data: { keyWord: string }): void {
        this.state.setCurrentLocation(data.keyWord);
    }

    // Characters
    @updateFromFrontend("add-character")
    addCharacter(_data: unknown): void {
        this.state.addCharacter();
    }

    @updateFromFrontend("update-character")
    updateCharacter(data: CharacterData): void {
        this.state.updateCharacter(data);
    }

    @updateFromFrontend("remove-character")
    deleteCharacter(data: { keyWord: string }): void {
        this.state.deleteCharacter(data.keyWord);
    }

    // Text
    @updateFromFrontend("set-current-text")
    setCurrentText(text: string): void {
        this.state.setCurrentText(text);
        this.emitVNState();
    }

    // Choices
    @updateFromFrontend("add-choice")
    addChoice(_data: unknown): void {
        this.state.addChoice();
    }

    // Checks to see if inputted keyword is a choice vote text or not
    // If so, vote for that choice
    voteForChoice = (keyWord: string): void => {
        const choices = this.state.getAllChoices();
        const thisChoice = choices.find((choice) => choice.getkeyWord() === keyWord);

        if (thisChoice) {
            thisChoice.voteForChoice();
        }
    };

    @updateFromFrontend("update-choice")
    updateChoice(data: ChoiceData): void {
        this.state.updateChoice(data);
    }

    @updateFromFrontend("remove-choice")
    deleteChoice(data: { keyWord: string }): void {
        this.state.deleteChoice(data.keyWord);
    }

    // Mode
    @updateFromFrontend("set-mode")
    setMode(data: { mode: VNMode }): void {
        this.state.setMode(data.mode);
    }

    @updateFromFrontend("how-to-join")
    howToJoin(_data: unknown): void {
        this.state.sendHowToJoin();
    }

    @updateFromFrontend("load-state")
    loadState(data: VNStateData): void {
        this.state.setState(data);
    }

    // Given a keyword, vote for the corresponding
    // choice if its an option
    voteByKeyword = (keyword: string): void => {
        const choices = this.state.getAllChoices();
        const choiceToVote = choices.find((c) => c.getkeyWord() === keyword);
        if (choiceToVote) {
            console.log(`Detected a choice vote`);
            choiceToVote.voteForChoice();
        }
    };

    // Called on construction, sets all functions with the
    // updateFromFrontend decorator to be called on a specific
    // websocket subject
    registerAllFrontendListeners = (bindings: FrontendBinding[] | undefined): void => {
        if (bindings) {
            for (const { wsSubject, methodName } of bindings) {
                const method = (this as unknown as Record<string, unknown>)[methodName];
                if (typeof method !== "function") continue;
                this.wsManager.registerFrontendListener(wsSubject, method.bind(this));
            }
        }
    };
}
