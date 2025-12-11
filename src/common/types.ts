import { ChatGodProps } from "../backend/src/chatgod-js/src/common/types";

export type VNMode = 'choice' | 'text';

export interface ChoiceData {
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
    currentLocation: number;
    locationOptions: LocationData[];
    characters: CharacterData[];
    currentText: string;
    currentChoices: ChoiceData[];
    currentMode: VNMode;
}

const VN_SUBJECTS = {
    currentLocation: ['set-current-location'],
    locationOptions: ['add-location', 'remove-location', 'update-location'],
    characters: ['add-character', 'update-character', 'delete-character'],
    currentText: ['set-current-text'],
    currentChoices: ['add-choice', 'update-choice', 'delete-choice'],
    currentMode: ['set-mode'],
} as const;

export type VNStateField = keyof typeof VN_SUBJECTS;
export type VNSubject<F extends VNStateField> = typeof VN_SUBJECTS[F][number];

const defaultLocation: LocationData = {
    image: '/defaultClassroom.jpg',
    name: 'Classroom'
}

export const defaultVNState: VNStateData = {
    currentLocation: 0,
    locationOptions: [defaultLocation],
    characters: [],
    currentText: 'The adventure begins',
    currentChoices: [],
    currentMode: 'text'
}
