'use client'

import { ChoiceDisplay } from "./choice/ChoiceDisplay";
import { SceneDisplay } from "./SceneDisplay";
import { DialogueDisplay } from "./dialogue/DialogueDisplay";
import { VNStateData } from "../../../common/types";
import { CharacterDisplay } from "./characters/CharacterDisplay";

interface DisplayPageProps {
    vnState: VNStateData
}

const DisplayPage = ({vnState}: DisplayPageProps) => {

    const currentLocation = vnState.locationOptions[vnState.currentLocation];
    const characters = vnState.characters;
    const currentText = vnState.currentText;
    const currentChoices = vnState.currentChoices;
    const currentMode = vnState.currentMode;
    const currentSpeaker = vnState.currentSpeaker;

    return (
        <main
            className="relative w-[1920px] h-[1080px] overflow-hidden"
            style={{ width: '1920px', height: '1080px' }}
        >
            <SceneDisplay bgImage={currentLocation.image}/>
            <CharacterDisplay characters={characters}/>

            {currentMode === 'choice' && (
                <div className="absolute inset-0">
                    <ChoiceDisplay choices={currentChoices}/>
                </div>
            )}

            {currentMode === 'text' && (
                <DialogueDisplay text={currentText} speaker={currentSpeaker}/>
            )}
        </main>
    );
}

export default DisplayPage;
