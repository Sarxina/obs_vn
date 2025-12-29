import { ChatGod, ChatGodManager, updateFromFrontend, updateGodState } from "./chatgod-js/src/services/ChatGodManager"
import { WSManager } from "./chatgod-js/src/services/WSManager";
import http from "http";
import { WSManagerVN } from "./WSManagerVN";
import { CharacterData, ChoiceData, LocationData, VNMode, VNStateData } from "../../common/types";

// Decorator to put on any function that should trigger an update of the VN state
function updateVNState(_target: any, _propertyKey: any, descriptor: PropertyDescriptor) {

    // Get the original function
    const original = descriptor.value;

    descriptor.value = function (this: VNState, ...args: any[]) {
        const result = original.apply(this, args);
        this.onStateChange();
        return result;
    }
    return descriptor;
}

class Choice {
    private text: string;
    private keyWord: string;
    private numVotes: number;
    onStateChange: () => void;

    constructor (
        text: string,
        keyWord: string,
        onStateChange: () => void
    ) {
        this.text = text;
        this.keyWord = keyWord;
        this.numVotes = 0;
        this.onStateChange = onStateChange;
    }

    serialize = (): ChoiceData => {
        return {
            text: this.text,
            keyWord: this.keyWord,
            numVotes: this.numVotes
        }
    }

    setText = (text: string) => {
        this.text = text;
    }

    @updateVNState
    voteForChoice() {
        this.numVotes += 1;
    }

    getkeyWord = () => {
        return this.keyWord;
    }
}

// Custom ChatGod that handles character information
class Character extends ChatGod {
    private name: string;
    private inScene: boolean

    constructor(keyWord: string, onStateChange: () => void) {
        super(keyWord, onStateChange)
        this.name = 'Sarxina';
        this.inScene = false;
    }

    getName = () => {
        return this.name;
    }

    getInScene = () => {
        return this.inScene;
    }

    serialize = (): CharacterData => {
        return {
            ...super.serialize(),
            name: this.name,
            inScene: this.inScene
        }
    }

    // Perform a full or partial in place update of the character
    update = (newData: CharacterData) => {
        // Start with data that can be done safely in place
        this.image = newData.image;
        this.name = newData.name;
        this.keyWord = newData.keyWord;
        this.inScene = newData.inScene;

        this.setLatestMessage(newData.latestMessage);
        this.toggleSpeakingState(newData.isSpeaking);
        this.setTTSSettings(newData.ttsVoice, newData.ttsStyle);
        this.setCurrentChatter(newData.currentChatter);

    }
}

// Manages the characters and their state updates
// Uses the chatgod-ks package
class CharacterManager extends ChatGodManager<Character> {
    static ChatGodClass = Character;
    managerContext: VNManager // The manager

    emitChatGods() {
        this.managerContext.emitVNState();
    }

    protected createChatGod(keyword: string): Character {
        return new Character(keyword, this.managerContext.emitVNState.bind(this.managerContext));
    }
    serializeChatGods = (): CharacterData[] => {
        return this.chatGods.map(g => g.serialize());
    }


    createInitialGods() {
        this.managerContext = this.managerContext;
        this.wsManager = this.managerContext.wsManager;
        this.chatGods = [
            this.createChatGod(this.getKeyword(1)),
            this.createChatGod(this.getKeyword(2)),
            this.createChatGod(this.getKeyword(3))
        ]
    }

    constructor (
        server: http.Server,
        managerContext: VNManager
    ) {
        // Pass null so ChatGodManager doesn't create a WSManager
        // We should definately reorganize, this is a little silly.
        super(null, managerContext);
        const bindings = (this as any).__proto__.__frontendBindings;
        this.registerAllFrontendListeners(bindings);
    }

    // Override speaking to set the VN's current speaker
    // as well as only allow active characters to speak
    speakMessage(chatGod: Character, message: string): void {
        // Speak only if the god is in the scene
        if (chatGod.getInScene()) {
            this.managerContext.state.setCurrentSpeaker(chatGod.getName());
            this.managerContext.state.setCurrentText(message);
            super.speakMessage(chatGod, message);
        }
    }
    // After processing chat gods messagines
    // Check to see if message qualifies as a choice vote
    processMessage (message: string, chatter: string) {
        this.managerContext.voteByKeyword(message);
        super.processMessage(message, chatter);
    }
}

// Manages the game's current location
class Location {
    private name: string;
    private image: string;
    keyWord: string;

    constructor (
        name: string = 'classroom',
        image: string = 'defaultClassroom.jpg',
        keyword: string = `!location${Math.floor(Math.random() * 100)}`
    ) {
        this.name = name;
        this.image = image;
        this.keyWord = keyword;
    }

    update = (data: LocationData) => {
        this.name = data.name;
        this.image = data.image;
    }

    serialize = (): LocationData => {
        return {
            name: this.name,
            image: this.image,
            keyWord: this.keyWord
        }
    }
}

// Manages the game's full state
class VNState {
    private currentLocation: number;     // The index of which location we're at
    private locationOptions: Location[];
    private characters: CharacterManager
    private currentText: string;
    private currentChoices: Choice[];
    private currentMode: VNMode;
    private currentSpeaker: string;

    managerContext: VNManager;
    onStateChange: () => void;

    constructor (
        server: http.Server,
        managerContext: VNManager,
        onStateChange: () => void
    ) {
        this.locationOptions = [new Location()];
        this.currentLocation = 0;
        this.characters = new CharacterManager(server, managerContext);
        this.currentSpeaker = this.characters.chatGods[0].getName();
        this.currentText = 'The story begins...'
        this.currentChoices = [
            new Choice('First Choice', '!choice1', onStateChange),
            new Choice('Second Choice', '!choice2', onStateChange)
        ]
        this.currentMode = 'text';


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
            currentSpeaker: this.currentSpeaker
        }
    }

    /** Location CRUD */
    // Create
    @updateVNState
    addLocation() {
        const newLocation = new Location();
        this.locationOptions.push(newLocation);
    }

    // Remove spesific location from options
    // Update
    @updateVNState
    removeLocation(idx: number) {
        this.locationOptions.splice(idx, 1);
    }

    @updateVNState
    updateLocation(newData: LocationData) {
        const locToChange = this.locationOptions.find(loc => loc.keyWord === newData.keyWord);
        if (locToChange) {
            locToChange.update(newData);
        }
    }

    @updateVNState
    setCurrentLocation(idx: number) {
        if (idx >= this.locationOptions.length) {
            throw new Error('Tried to set non-existance location')
        }
        this.currentLocation = idx;
    }

    /** Character CRUD */
    @updateVNState
    addCharacter() {
        this.characters.addChatGod({});
    }

    @updateVNState
    updateCharacter(newData: CharacterData) {
        const charToChange = this.characters.getChatGodByKeyword(newData.keyWord) as Character;
        if (charToChange) {charToChange.update(newData)};
    }

    @updateVNState
    deleteCharacter(idx: number) {
        this.characters.deleteChatGod(idx);
    }

    /** Text CRUD */
    setCurrentText(text: string) {
        this.currentText = text;
    }

    setCurrentSpeaker(speaker: string) {
        this.currentSpeaker = speaker;
    }

    /** Choice CRUD */
    @updateVNState
    addChoice() {
        const newChoice = new Choice(
            'This is a new choice',
            `!voteChoice${this.currentChoices.length + 1}`,
            this.onStateChange
        )
        this.currentChoices.push(newChoice);
    }

    getAllChoices() {
        return this.currentChoices;
    }

    getAllLocations() {
        return this.locationOptions;
    }

    @updateVNState
    updateChoice(choice: ChoiceData) {
        const choiceToChange = this.getAllChoices().findIndex((c) => c.getkeyWord() === choice.keyWord)
        this.currentChoices[choiceToChange].setText(choice.text);
    }

    @updateVNState
    deleteChoice(idx: number) {
        this.currentChoices.splice(idx, 1);
    }

    //** Mode CRUD */
    @updateVNState
    setMode(mode: VNMode) {
        this.currentMode = mode;
    }

    // Directly set all of the locations
    _setLocations(locations: LocationData[]) {
        const newLocations: Location[] = [];
        for (const location of locations) {
            const newLocation = new Location(
                location.name,
                location.image,
                location.keyWord
            )
            newLocations.push(newLocation);
        }
        this.locationOptions = newLocations;
    }

    // Directly set the entire state
    @updateGodState
    setState(state: VNStateData) {
        // Location

        // Characters

        // Choices

        // Mode
    }

}

// Manages the game
export class VNManager {
    state: VNState;
    wsManager: WSManagerVN;

    emitVNState () {
        this.wsManager.emitVNState(this.state.serialize());
    };

    getLocationByKeyword = (keyWord: string) => {
        return this.state.getAllLocations().find(loc => loc.keyWord);
    }

    /** Websocket hooks */
    @updateFromFrontend('get-vnstate')
    respondVNState = (data: any) => {
        this.emitVNState();
    };

    // Location
    @updateFromFrontend('add-location')
    addLocation = (data: any) => {
        this.state.addLocation();
    };

    @updateFromFrontend('remove-location')
    removeLocation = (data: any) => {
        this.state.removeLocation(data.idx);
    };

    @updateFromFrontend('update-location')
    updateLocation = (data: any) => {
        this.state.updateLocation(data);
    };

    @updateFromFrontend('set-current-location')
    setCurrentLocation = (data: any) => {
        this.state.setCurrentLocation(data.idx);
    }

    // Characters
    @updateFromFrontend('add-character')
    addCharacter = (data: any) => {
        this.state.addCharacter();
    };

    @updateFromFrontend('update-character')
    updateCharacter = (data: any) => {
        this.state.updateCharacter(data);
    };

    @updateFromFrontend('delete-character')
    deleteCharacter = (data: any) => {
        this.state.deleteCharacter(data.idx);
    };

    // Text
    @updateFromFrontend('set-current-text')
    setCurrentText = (text: string) => {
        this.state.setCurrentText(text);
        this.emitVNState();
    }

    // Choices
    @updateFromFrontend('add-choice')
    addChoice = (data: any) => {
        this.state.addChoice();
    };

    // Checks to see if inputted keyword is a choice vote text or not
    // If so, vote for that choice
    voteForChoice = (keyWord: string) => {
        const choices = this.state.getAllChoices()
        const thisChoice = choices.find(choice => choice.getkeyWord() === keyWord)

        if (thisChoice) {
            thisChoice.voteForChoice();
        }
    }

    @updateFromFrontend('update-choice')
    updateChoice = (data: ChoiceData) => {
        this.state.updateChoice(data);
    };

    @updateFromFrontend('delete-choice')
    deleteChoice = (data: any) => {
        this.state.deleteChoice(data.idx);
    };

    // Mode
    @updateFromFrontend('set-mode')
    setMode = (data: any) => {
        this.state.setMode(data.mode);
    }

    @updateFromFrontend('load-state')
    loadState = (data: VNStateData) => {
        // placeholder
        this.state.setState(data);
    }

    // Given a keyword, vote for the corresponding
    // choice if its an option
    voteByKeyword = (keyword: string) => {
        const choices = this.state.getAllChoices();
        const choiceToVote = choices.find((c) => c.getkeyWord() === keyword);
        if (choiceToVote) {
            console.log(`Detected a choice vote`)
            choiceToVote.voteForChoice();
        }
    }


    constructor(server: http.Server) {
        console.log("Attempting to start the VNManager");

        this.wsManager = new WSManagerVN(server);
        // Create the state class with the server, this context, and the update callback
        this.state = new VNState(server, this, this.emitVNState.bind(this));

        const bindings = (this as any).__proto__.__frontendBindings;
        this.registerAllFrontendListeners(bindings);
        this.emitVNState();
        console.log('VNManager is now running')
    }

    // Called on construction, sets all functions with the
    // updateFromFrontend decorator to be called on a spesific
    // websocket subject
    registerAllFrontendListeners = (bindings: any) => {
        // Register all of the subjects that communicate with the frontend
        console.log(bindings)
        if (bindings) {
            for (const {wsSubject, methodName} of bindings) {
                this.wsManager.registerFrontendListener(wsSubject, (this as any)[methodName].bind(this));
            }
        }
    }
}
