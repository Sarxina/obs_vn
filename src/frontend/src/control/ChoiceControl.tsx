'use client'

import { ChoiceData } from "../../../common/types"
import { ChoiceControlPanel } from "./ChoiceControlPanel"
import Switch from "react-switch";


interface ChoiceControlProps {
    choices: ChoiceData[]
    mode: string
    onChoiceChange: (newChoice: ChoiceData) => void
    onModeChange: (newMode: 'text' | 'choice') => void
}

export const ChoiceControl = ({choices, mode, onChoiceChange, onModeChange} : ChoiceControlProps) => {
    return (
        <div className="bg-yellow-200 rounded-lg flex flex-col text-2xl font-semibold border-2 border-yellow-400">
            <label>
                Turn on Choice Mode:
                <Switch
                    onChange={(checked: boolean) => onModeChange(checked === true ? 'choice' : 'text')}
                    checked={mode === 'choice'}
                />
            </label>
            <div>
                {choices
                .map((c) => (
                    <ChoiceControlPanel choice={c} key={c.keyWord} onChange={onChoiceChange}/>
                ))}
            </div>
        </div>
    )
}
