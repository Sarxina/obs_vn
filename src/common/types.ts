import { ChatGodProps } from "../backend/src/chatgod-js/src/common/types";

export type VNMode = 'choice' | 'text';

interface ChoiceData {
    text: string;
    voteString: string;
    numVotes: number;
}

export interface CharacterData extends ChatGodProps {
    name: string;
    inScene: boolean;
}

export interface LocationData {
    name: string;
    image: string;
}

export interface VNStateData {
    currentLocation: LocationData;
    locationOptions: LocationData[];
    characters: CharacterData[];
    currentText: string;
    currentChoices: ChoiceData[];
    currentMode: VNMode;
}
