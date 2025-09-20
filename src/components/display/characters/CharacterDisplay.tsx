'use client'

import { SingleCharacterDisplay } from "./SingleCharacter"

export const CharacterDisplay = () => {
    return (
        <div className="absolute inset-0">
            <div
            className="
                absolute
                bottom-0
                left-1/2
                -translate-x-1/2
                translate-y-[5%]
                w-[900px]       /* wider for proper aspect */
                h-[1200px]      /* big: fills ~110% of 1080p height */
            "
            >
            <SingleCharacterDisplay image="/SarxinaPortrait.png" />
            </div>
        </div>
    )
}
