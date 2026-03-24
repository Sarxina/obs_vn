'use client'

import { SceneDisplay } from "./SceneDisplay";
import { VNStateData } from "../../../common/types";
import { CharacterDisplay } from "./characters/CharacterDisplay";

interface DisplayPageProps {
    vnState: VNStateData
}

const BehindModel = ({vnState}: DisplayPageProps) => {

    const currentLocation = vnState.locationOptions.find(l => l.keyWord === vnState.currentLocation);
    const characters = vnState.characters;

    return (
        <div className="absolute inset-0">
            <SceneDisplay bgImage={currentLocation?.image}/>
            <CharacterDisplay characters={characters}/>
        </div>
    );
}

export default BehindModel;
