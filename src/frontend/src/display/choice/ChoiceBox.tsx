'use client'

import { ChoiceData } from "../../../../common/types";
import { VoteCountDisplay } from "./VoteCountDisplay";


export const ChoiceBox = ({ text, keyWord, numVotes }: ChoiceData) => {
    return (
        <div
            className="
                relative
                flex items-center
                bg-white/80 backdrop-blur-md
                border-2 border-pink-300 rounded-xl shadow-lg
                px-6 py-4 text-gray-900 font-semibold text-xl
                w-full max-w-3xl mx-auto
            "
        >
            {/* Centered text */}
            <span className="absolute left-1/2 -translate-x-1/2 text-center">
                {text}
            </span>

            {/* Right-aligned vote box */}
            <div className="ml-auto">
                <VoteCountDisplay keyWord={keyWord} numVotes={numVotes} />
            </div>
        </div>
    );
};

