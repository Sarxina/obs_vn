'use client'
import { useEffect, useState } from "react";
import { defaultDisplayState } from "../types/display-state";
import { ChoiceDisplay } from "./choice/ChoiceDisplay";
import { SceneDisplay } from "./SceneDisplay";
import { DialogueDisplay } from "./dialogue/DialogueDisplay";
import { VNStateData } from "../../../common/types";
import { UpdateVNStateFun } from "../clientState";
import { CharacterDisplay } from "./characters/CharacterDisplay";

const DisplayPage = ({vnState, onUpdate}: {vnState: VNStateData, onUpdate: UpdateVNStateFun}) => {

    const currentLocation = vnState.locationOptions[vnState.currentLocation];
    const characters = vnState.characters;
    const currentText = vnState.currentText;
    const currentChoices = vnState.currentChoices;
    const currentMode = vnState.currentMode;
    return (
        <main
            className="relative w-[1920px] h-[1080px] overflow-hidden"
            style={{ width: '1920px', height: '1080px' }}
        >
            <SceneDisplay bgImage={currentLocation.image}/>
            <CharacterDisplay characters={characters}/>

            {currentMode === 'choice' && (
                <div className="absolute inset-0">
                    <ChoiceDisplay />
                </div>
            )}

            {currentMode === 'text' && (
                <DialogueDisplay text={currentText} speaker="Sarxina"/>
            )}
        </main>
    );
}

export default DisplayPage;
