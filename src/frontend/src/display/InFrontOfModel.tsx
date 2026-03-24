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
        <div className="absolute inset-0">
            {currentMode === 'choice' && (
                <div className="absolute inset-0">
                    <ChoiceDisplay choices={currentChoices}/>
                </div>
            )}

            {currentMode === 'text' && (
                <DialogueDisplay text={currentText} speaker={currentSpeaker}/>
            )}
        </div>
    );
}

export default InFrontOfModel;
