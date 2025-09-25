'use client'
import { CharacterDisplay, PositionedCharacter } from "@/components/display/characters/CharacterDisplay";
import { SingleCharacterDisplayProps } from "@/components/display/characters/SingleCharacter";
import { ChoiceDisplay } from "@/components/display/choice/ChoiceDisplay";
import { DialogueDisplay } from "@/components/display/dialogue/DialogueDisplay";
import { SceneDisplay } from "@/components/display/SceneDisplay";
import { Character, CharacterList } from "@/types/character";
import { ChoiceList } from "@/types/choice";
import { defaultDisplayState } from "@/types/display-state";
import { useEffect, useState } from "react";

const DisplayScreen = () => {
    const [curDisplayState, setCurDisplayState] = useState(defaultDisplayState)

    useEffect(() => {
        const channel = new BroadcastChannel('vn-state')

        channel.onmessage = (e) => {
            setCurDisplayState((prev) => ({...prev, ...e.data}));
        };
        return () => channel.close();
    }, []);

    const {displayMode, characters, speaker, choices} = curDisplayState
    return (
        <main
            className="relative w-[1920px] h-[1080px] overflow-hidden"
            style={{ width: '1920px', height: '1080px' }}
        >
            <SceneDisplay bgImage="/defaultClassroom.jpg"/>
            <CharacterDisplay characters={characters}/>

            {displayMode === 'choice' && (
                <div className="absolute inset-0">
                    <ChoiceDisplay />
                </div>
            )}

            {displayMode === 'dialogue' && (
                <DialogueDisplay />
            )}
        </main>
    );
}

export default DisplayScreen;
