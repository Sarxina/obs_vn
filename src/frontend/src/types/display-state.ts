import { Character, CharacterList, SarxinaCharacter, SarxinaCharacter2 } from "./character";
import { ChoiceList } from "./choice";

type DisplayMode = 'choice' | 'dialogue';

interface DisplayState {
    displayMode: DisplayMode
    characters: CharacterList
    speaker: Character
    choices: ChoiceList
    scene: string
}

export const defaultDisplayState: DisplayState = {
    displayMode: 'dialogue',
    characters: [SarxinaCharacter, SarxinaCharacter2],
    speaker: SarxinaCharacter,
    choices: [],
    scene: '/defaultClassroom.jpg'
}
