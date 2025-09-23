'use client'
import { CharacterDisplay, PositionedCharacter } from "@/components/display/characters/CharacterDisplay";
import { SingleCharacterDisplayProps } from "@/components/display/characters/SingleCharacter";
import { ChoiceDisplay } from "@/components/display/choice/ChoiceDisplay";
import { DialogueDisplay } from "@/components/display/dialogue/DialogueDisplay";
import { SceneDisplay } from "@/components/display/SceneDisplay";
import { useState } from "react";

const Sarxina: SingleCharacterDisplayProps = {
    image: '/SarxinaPortrait.png'
}

const posSarxina: PositionedCharacter = {
    id: 'Sarxina',
    character: Sarxina,
    position: 0.50
}

type displayMode = 'choice' | 'dialogue'

const DisplayScreen = () => {
    const [posCharacters, setPosCharacters] = useState([posSarxina])
    const [curDisplayMode, setCurDisplayMode] = useState<displayMode>('dialogue')

    return (
        <main
            className="relative w-[1920px] h-[1080px] overflow-hidden"
            style={{ width: '1920px', height: '1080px' }}
        >
            <SceneDisplay bgImage="/defaultClassroom.jpg"/>
            <CharacterDisplay posCharacters={posCharacters}/>

            {curDisplayMode === 'choice' && (
                <div className="absolute inset-0">
                    <ChoiceDisplay />
                </div>
            )}

            {curDisplayMode === 'dialogue' && (
                <DialogueDisplay />
            )}
        </main>
    );
}

export default DisplayScreen;
