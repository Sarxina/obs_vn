'use client'

import { CharacterData } from "../../../common/types"

interface CharacterControlPanelProps {
    character: CharacterData
    onChange: (char: CharacterData) => void
}
export const CharacterControlPanel = ({character, onChange}: CharacterControlPanelProps) => {

    return (
        <div className="flex flex-row">
            <label>
                Name:
                <input
                    value={character.name}
                    onChange={e => onChange({...character, name: e.target.value})}
                />
            </label>
            <label>
                Chatter:
                <input
                    value={character.currentChatter}
                    onChange={e => onChange({...character, currentChatter: e.target.value})}
                />
            </label>
            <label>
                Image:
                <input
                    value={character.image}
                    onChange={e => onChange({...character, image: e.target.value})}
                />
            </label>
            <label>
                In Scene:
                <input
                    type="checkbox"
                    checked={character.inScene}
                    onChange={e => onChange({...character, inScene: e.target.checked})}
                />
            </label>
        </div>
    )
}
