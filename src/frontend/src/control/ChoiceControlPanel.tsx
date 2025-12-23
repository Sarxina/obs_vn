import { ChoiceData } from "../../../common/types"

interface ChoiceControlPanelProps {
    choice: ChoiceData
    onChange: (choice: ChoiceData) => void
}

export const ChoiceControlPanel = ({choice, onChange}: ChoiceControlPanelProps) => {
    return (
        <div className="flex flex-row">
            <label>
                Text:
                <input
                    value={choice.text}
                    onChange={e => onChange({...choice, text: e.target.value})}
                />
            </label>
        </div>
    )
}
