'use client'

import { CharacterData } from "../../../common/types";
import { CharacterControlPanel } from "./CharacterControlPanel";
import { AddButton } from "./Utils";


interface CharacterControlProps {
    characters: CharacterData[]
    onCharacteUpdate: (newChar: CharacterData) => void
    onAddCharacter: () => void
    onRemoveCharacter: (keyword: string) => void
};

// Full quandrant for controlling the characters (and associated chatters)
export const CharacterControl = ({
    characters,
    onCharacteUpdate,
    onAddCharacter,
    onRemoveCharacter
} : CharacterControlProps) => {
    return (
        <div className="bg-green-50 rounded-lg flex flex-col gap-3 p-4 border-2 border-green-300 shadow-sm">
            <h2 className="text-lg font-semibold text-green-900 mb-2">Characters</h2>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-96">
                {characters.map((c) => (
                    <CharacterControlPanel
                        character={c}
                        key={c.keyWord}
                        onCharacteUpdate={onCharacteUpdate}
                        onRemoveCharacter={onRemoveCharacter}
                    />
                ))}
            </div>
            <AddButton onClick={onAddCharacter}/>
        </div>
    )
}
