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

const BehindModel = ({vnState}: DisplayPageProps) => {

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
        </main>
    );
}

export default BehindModel;
