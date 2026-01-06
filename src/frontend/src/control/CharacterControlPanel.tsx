'use client'

import { CharacterData } from "../../../common/types"
import {RemoveButton, SimpleTextInput } from "./Utils"

interface CharacterControlPanelProps {
    character: CharacterData
    onCharacteUpdate: (char: CharacterData) => void
    onRemoveCharacter: (keyword: string) => void
}
export const CharacterControlPanel = ({
    character,
    onCharacteUpdate,
    onRemoveCharacter
}: CharacterControlPanelProps) => {
    const fields = {
        Name: 'name',
        Chatter: 'currentChatter',
        Image: 'image'
    }
    return (
        <div className="flex flex-wrap gap-3 items-end p-3 bg-white bg-opacity-50 rounded-md">
            {Object.entries(fields).map(([labelName, objKey]) => (
                <SimpleTextInput
                    labelName={labelName}
                    obj={character}
                    key={objKey}
                    objKey={objKey as keyof CharacterData}
                    onChange={onCharacteUpdate}
                />
            ))}
            <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">In Scene</span>
                <input
                    type="checkbox"
                    checked={character.inScene}
                    onChange={e => onCharacteUpdate({...character, inScene: e.target.checked})}
                    className="w-5 h-5 rounded"
                />
            </label>
            <RemoveButton
                onClick={() => onRemoveCharacter(character.keyWord)}
            />
        </div>
    )
}
