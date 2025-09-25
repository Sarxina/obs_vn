'use client'

import { CharacterList } from "@/types/character"
import { SingleCharacterDisplay, SingleCharacterDisplayProps } from "./SingleCharacter"

interface CharacterDisplayProps {
    characters: CharacterList
}
export const CharacterDisplay = ({characters}: CharacterDisplayProps) => {
    return (
        <div className="absolute inset-0 w-full h-full flex justify-center items-end pointer-events-none">
            {characters.map((c) => (
                <SingleCharacterDisplay key={c.name} image={c.image} name={c.name}/>
            ))}
        </div>
    )
}
