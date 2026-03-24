'use client'

import { VNStateData } from "../../../common/types";
import BehindModel from "./BehindModel";
import InFrontOfModel from "./InFrontOfModel";

interface DisplayPageProps {
    vnState: VNStateData
}

const DisplayPage = ({vnState}: DisplayPageProps) => {
    return (
        <main
            className="relative w-[1920px] h-[1080px] overflow-hidden"
            style={{ width: '1920px', height: '1080px' }}
        >
            <BehindModel vnState={vnState}/>
            <InFrontOfModel vnState={vnState}/>
        </main>
    );
}

export default DisplayPage;
