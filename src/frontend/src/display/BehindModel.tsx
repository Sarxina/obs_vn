'use client'

import { SceneDisplay } from "./SceneDisplay";
import { VNStateData } from "../../../common/types";
import { CharacterDisplay } from "./characters/CharacterDisplay";

interface DisplayPageProps {
    vnState: VNStateData
}

const BehindModel = ({vnState}: DisplayPageProps) => {

    const currentLocation = vnState.locationOptions[vnState.currentLocation];
    const characters = vnState.characters;

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
