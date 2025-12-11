'use client'

export const VoteCountDisplay = () => {
    return (
        <div
            className="
                flex flex-col items-center
                bg-white/70
                backdrop-blur-sm
                border border-pink-300
                rounded-md
                px-3
                py-2
                text-gray-900
                text-sm
                w-20
            "
        >
            /** top row: icon + count */
            <div className="flex items-center gap-1 mb-1">
                <span className="text-pink-500 text-lg">👤</span>
                <span className="font-bold text-base">12</span>
            </div>
            /** bottom row: vote command */
            <div className="text-xs text-gray-700">!choose 1</div>

        </div>
    )
}
