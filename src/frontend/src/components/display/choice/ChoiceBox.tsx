'use client'

import { VoteCountDisplay } from "./VoteCountDisplay";

export const ChoiceBox = () => {
    return (
        <div
            className="
                flex
                justify-between
                items-center
                bg-white/80
                backdrop-blur-md
                border-2 border-pink-300
                rounded-xl
                shadow-lg
                px-6
                py-4
                text-gray-900
                font-semibold
                text-xl
                max-w-[70%]
                mx-auto
            "
        >
            <span>this is a sample choice.</span>
            <VoteCountDisplay />
        </div>
    );
}
