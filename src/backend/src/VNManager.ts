import { ChatGod, ChatGodManager } from "./chatgod-js/src/services/ChatGodManager"
import { WSManager } from "./chatgod-js/src/services/WSManager";
import http from "http";
import { CharacterData, LocationData, VNMode, VNStateData } from "../../common/types";
import { WSManagerVN } from "./WSManagerVN";

// Custom ChatGod that handles character information
class Character extends ChatGod {
    private name: string;
    private inScene: boolean

    constructor(keyWord: string, onStateChange: () => void) {
        super(keyWord, onStateChange)
        this.name = 'Sarxina';
        this.inScene = false;
    }

    serialize = (): CharacterData => {
        return {
            ...super.serialize(),
            name: this.name,
            inScene: this.inScene
        }
    }
}

// Manages the characters and their state updates
// Uses the chatgod-ks package
class CharacterManager extends ChatGodManager {
    static ChatGodClass = Character;
    chatGods: Character[] = [];
    managerContext: VNManager // The manager

    serializeChatGods = (): CharacterData[] => {
        return this.chatGods.map(g => g.serialize());
    }

    createWSManager: (server: http.Server) => {

    }


    constructor (server: http.Server, managerContext: VNManager) {
        this.managerContext = managerContext
        super(server)
    }

}

// Manages the game's current location
class Location {
    private name: string;
    private image: string;

    constructor () {
        this.name = 'classroom';
        this.image = 'defaultClassroom.jpg'
    }

    serialize = (): LocationData => {
        return {
            name: this.name,
            image: this.image
        }
    }
}

// Manages the game's full state
class VNState {
    private currentLocation: Location;
    private locationOptions: Location[];
    private characters: CharacterManager
    private currentText: string;
    private currentChoices: Choice[];
    private currentMode: VNMode;

    constructor (server: http.Server, managerContext: VNManager) {
        this.locationOptions = [new Location()];
        this.currentLocation = this.locationOptions[0];
        this.characters = new CharacterManager(server, this);
        this.currentText = 'The story begins...'
        this.currentChoices = [new Choice(), new Choice()]
        this.currentMode = 'text';
    }

    serialize = (): VNStateData => {
        return {
            currentLocation: this.currentLocation.serialize(),
            locationOptions: this.locationOptions.map((loc) => loc.serialize()),
            characters: this.characters.serializeChatGods(),
            currentText: this.currentText,
            currentChoices: this.currentChoices.map((choice) => choice.serialize()),
            currentMode: this.currentMode
        }
    }
}

// Manages the game
class VNManager {
    private state: VNState;
    wsManager: WSManagerVN;

    constructor(server: http.Server) {
        console.log("Attempting to start the VNManager");

        this.wsManager = new WSManagerVN(server);
        this.state = new VNState(server, this);

        const bindings = (this as any).__proto__.__frontendBindings;
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
