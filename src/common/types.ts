// Local copy of ChatGodProps and its enum deps from @sarxina/chatgod-js.
// Defined here so the frontend doesn't transitively depend on chatgod-js
// (which is a backend-only package with native deps like `speaker`).
// Keep these in sync with @sarxina/chatgod-js if its public types change.
export const AZURE_VOICES = [
    "en-US-DavisNeural",
    "en-US-TonyNeural",
    "en-US-JasonNeural",
    "en-US-GuyNeural",
    "en-US-JaneNeural",
    "en-US-NancyNeural",
    "en-US-JennyNeural",
    "en-US-AriaNeural",
] as const;

export const AZURE_VOICE_STYLES = [
    "angry",
    "cheerful",
    "excited",
    "hopeful",
    "sad",
    "shouting",
    "terrified",
    "unfriendly",
    "whispering",
] as const;

export type AzureVoice = typeof AZURE_VOICES[number];
export type AzureStyle = typeof AZURE_VOICE_STYLES[number];

export interface ChatGodProps {
    image: string;
    latestMessage: string;
    keyWord: string;
    currentChatter: string;
    queueSize: number;
    ttsVoice: AzureVoice;
    ttsStyle: AzureStyle;
    isSpeaking: boolean;
}

export type VNMode = 'choice' | 'text';
export type GamePieces = 'characters' | 'locationOptions' | 'currentChoices'
export type GamePiece = 'character' | 'location' | 'choice'

export interface ChoiceData {
    text: string;
    keyWord: string;
    numVotes: number;
}

export interface CharacterData extends ChatGodProps {
    name: string;
    inScene: boolean;
}

export interface LocationData {
    name: string;
    image: string;
    keyWord: string;
}

export interface VNStateData {
    currentLocation: string;
    locationOptions: LocationData[];
    characters: CharacterData[];
    currentSpeaker: string
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
    name: 'Classroom',
    keyWord: '!loc1'
}

export const defaultVNState: VNStateData = {
    currentLocation: defaultLocation.keyWord,
    locationOptions: [defaultLocation],
    characters: [],
    currentText: 'The adventure begins',
    currentChoices: [],
    currentMode: 'text',
    currentSpeaker: 'Sarxina'
}
