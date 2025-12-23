'use client'
import { useEffect, useState } from "react";
import { defaultDisplayState } from "../types/display-state";
import { ChoiceDisplay } from "./choice/ChoiceDisplay";
import { SceneDisplay } from "./SceneDisplay";
import { DialogueDisplay } from "./dialogue/DialogueDisplay";
import { VNStateData } from "../../../common/types";
import { UpdateVNStateFun } from "../clientState";
import { CharacterDisplay } from "./characters/CharacterDisplay";

interface DisplayPageProps {
    vnState: VNStateData
}

const InFrontOfModel = ({vnState}: DisplayPageProps) => {

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

export default InFrontOfModel;
