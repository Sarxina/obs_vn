'use client'

import { SingleCharacterDisplay, SingleCharacterDisplayProps } from "./SingleCharacter"

export interface PositionedCharacter {
    id: string
    character: SingleCharacterDisplayProps
    position: number // x position of the chracter
}
export interface CharacterDisplayProps {
    posCharacters: PositionedCharacter[]
}

export const CharacterDisplay = ({posCharacters}: CharacterDisplayProps) => {
    return (
        <div className="absolute inset-0">
            {posCharacters.map((posCharacter) => (
                <div
                    key={posCharacter.id}
                    className="
                        aboslute
                        bottom-0
                        left=1/2
                        translate-y-[5%]
                        w-[900px]
                        h-[1200px]
                    "
                    style={{left: `${posCharacter.position * 100}%`}}
                >
                    <SingleCharacterDisplay {...posCharacter.character} />
                </div>
            ))};
        </div>
    )
}
