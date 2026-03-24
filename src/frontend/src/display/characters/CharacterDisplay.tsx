'use client'

import { CharacterData } from "../../../../common/types"
import { SingleCharacterDisplay } from "./SingleCharacter"

interface CharacterDisplayProps {
    characters: CharacterData[]
}
export const CharacterDisplay = ({characters}: CharacterDisplayProps) => {
    const inScene = characters.filter(c => c.inScene);
    return (
        <div className="absolute inset-0 pointer-events-none">
            {inScene.map((c, i) => {
                const pct = (i + 1) / (inScene.length + 1) * 100;
                return (
                    <div
                        key={c.name}
                        className="absolute bottom-0"
                        style={{ left: `${pct}%`, transform: 'translateX(-50%)', width: 'max-content' }}
                    >
                        <SingleCharacterDisplay image={c.image} name={c.name} isSpeaking={c.isSpeaking}/>
                    </div>
                );
            })}
        </div>
    )
}
