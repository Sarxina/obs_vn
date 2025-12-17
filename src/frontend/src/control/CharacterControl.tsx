'use client'

import { CharacterData } from "../../../common/types";
import { CharacterControlPanel } from "./CharacterControlPanel";

interface CharacterControlProps {
    characters: CharacterData[]
    onChange: (newChar: CharacterData) => void
};

// Full quandrant for controlling the characters (and associated chatters)
export const CharacterControl = ({characters, onChange} : CharacterControlProps) => {
    return (
        <div className="bg-green-200 rounded-lg flex flex-col text-2xl font-semibold border-2 border-green-400">
            {characters.map((c) => (
                <CharacterControlPanel character={c} key={c.keyWord} onChange={onChange}/>
            ))}
        </div>
    )
}
