'use client'
import { ChoiceDisplay } from "./choice/ChoiceDisplay";
import { DialogueDisplay } from "./dialogue/DialogueDisplay";
import { VNStateData } from "../../../common/types";

interface DisplayPageProps {
    vnState: VNStateData
}

const InFrontOfModel = ({vnState}: DisplayPageProps) => {
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
