'use client'

import { ChoiceBox } from "./ChoiceBox"

export const ChoiceDisplay = () => {
    return (
        <div
            className="
                flex flex-col
                gap-6
                px-24
                w-full
            "
        >
            <ChoiceBox />
            <ChoiceBox />
            <ChoiceBox />
        </div>
    );
};
