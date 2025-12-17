import { VNStateData } from "../../../common/types"
import { UpdateVNStateFuns } from "../clientState";
import { CharacterControl } from "./CharacterControl"
import { ChoiceControl } from "./LocationControl";

interface ControlPageProps {
  vnState: VNStateData
  onUpdate: UpdateVNStateFuns
}

function ControlsPage({vnState, onUpdate}: ControlPageProps) {
  const characters = vnState.characters;
  const choices = vnState.currentChoices;
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Controls</h1>
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-6">
        <div className="bg-blue-200 rounded-lg flex items-center justify-center text-2xl font-semibold border-2 border-blue-400">
          Location Control
        </div>
        <CharacterControl characters={characters} onChange={(newChar) => onUpdate.updateGamePiece(newChar, 'character', 'characters')}/>
        <ChoiceControl choices={choices} onChange={(newChoice) => onUpdate.updateGamePiece(newChoice, 'choice', 'currentChoices')} />
        <div className="bg-red-200 rounded-lg flex items-center justify-center text-2xl font-semibold border-2 border-red-400">
          General Controls
        </div>
      </div>
    </div>
  )
}

export default ControlsPage
