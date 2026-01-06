import { ChoiceData } from "../../../common/types"
import { RemoveButton, SimpleTextInput } from "./Utils"

interface ChoiceControlPanelProps {
    choice: ChoiceData
    onChange: (choice: ChoiceData) => void
    onRemoveChoice: (keyWord: string) => void
}

export const ChoiceControlPanel = ({choice, onChange, onRemoveChoice}: ChoiceControlPanelProps) => {
    return (
        <div className="flex flex-wrap gap-3 items-end p-3 bg-white bg-opacity-50 rounded-md">
            <SimpleTextInput
                labelName="Text"
                obj={choice}
                key="text"
                objKey="text"
                onChange={onChange}
            />
            <RemoveButton
                onClick={() => onRemoveChoice(choice.keyWord)}
            />
        </div>
    )
}
