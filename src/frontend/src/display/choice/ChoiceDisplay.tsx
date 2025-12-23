'use client'

import { ChoiceData } from "../../../../common/types";
import { ChoiceBox } from "./ChoiceBox"

interface ChoiceDisplayProps {
    choices: ChoiceData[]
}

export const ChoiceDisplay = ({ choices }: ChoiceDisplayProps) => {
    return (
        <div
            className="
                flex flex-col
                justify-evenly
                min-h-screen
                px-24
                w-full
            "
        >
            {choices.map((c) => (
                <ChoiceBox
                    key={c.keyWord}
                    numVotes={c.numVotes}
                    keyWord={c.keyWord}
                    text={c.text}
                />
            ))}
        </div>
    );
};

