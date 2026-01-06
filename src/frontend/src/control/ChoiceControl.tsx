'use client'

import { ChoiceData } from "../../../common/types"
import { ChoiceControlPanel } from "./ChoiceControlPanel"
import Switch from "react-switch";
import { AddButton } from "./Utils";


interface ChoiceControlProps {
    choices: ChoiceData[]
    mode: string
    onChoiceUpdate: (newChoice: ChoiceData) => void
    onAddChoice: () => void
    onRemoveChoice: (keyWord: string) => void
    onModeChange: (newMode: 'text' | 'choice') => void
}

export const ChoiceControl = ({
    choices,
    mode,
    onChoiceUpdate,
    onAddChoice,
    onRemoveChoice,
    onModeChange
} : ChoiceControlProps) => {
    return (
        <div className="bg-yellow-50 rounded-lg flex flex-col gap-3 p-4 border-2 border-yellow-300 shadow-sm">
            <h2 className="text-lg font-semibold text-yellow-900 mb-2">Choices</h2>
            <label className="flex items-center gap-3 text-base font-medium">
                <span>Turn on Choice Mode:</span>
                <Switch
                    onChange={(checked: boolean) => onModeChange(checked === true ? 'choice' : 'text')}
                    checked={mode === 'choice'}
                />
            </label>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-96">
                {choices
                .map((c) => (
                    <ChoiceControlPanel
                        choice={c}
                        key={c.keyWord}
                        onChange={onChoiceUpdate}
                        onRemoveChoice={onRemoveChoice}
                        />
                ))}
            </div>
            <AddButton
                onClick={onAddChoice}
            />
        </div>
    )
}
