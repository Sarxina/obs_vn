import { ChoiceData } from "../../../common/types"
import { ChoiceControlPanel } from "./LocationControlPanel"

interface ChoiceControlProps {
    choices: ChoiceData[]
    onChange: (newChoice: ChoiceData) => void
}

export const ChoiceControl = ({choices, onChange} : ChoiceControlProps) => {
    return (
        <div className="bg-yellow-200 rounded-lg flex flex-col text-2xl font-semibold border-2 border-yellow-400">
            {choices
            .map((c) => (
                <ChoiceControlPanel choice={c} key={c.keyWord} onChange={onChange}/>
            ))}
        </div>
    )
}
