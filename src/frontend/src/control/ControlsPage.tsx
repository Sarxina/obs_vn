import { VNStateData, type LocationData } from "../../../common/types"
import { UpdateVNStateFuns } from "../clientState";
import { CharacterControl } from "./CharacterControl"
import { ChoiceControl } from "./ChoiceControl";
import { LocationControl } from "./LocationControl";
import { GeneralControl } from "./GeneralControl";

interface ControlPageProps {
  vnState: VNStateData
  onUpdate: UpdateVNStateFuns
}

function ControlsPage({vnState, onUpdate}: ControlPageProps) {
  const characters = vnState.characters;
  const choices = vnState.currentChoices;
  const locationOptions = vnState.locationOptions;
  const currentLocation = vnState.currentLocation;
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Controls</h1>
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-6">
        <LocationControl
          locOptions={locationOptions}
          currentLoc={currentLocation}
          onLocSelection={(locSelection: string) => onUpdate.setCurrentLoc(locSelection)}
          onLocUpdate={(newLoc: LocationData) => onUpdate.updateGamePiece(newLoc, 'location', 'locationOptions')}
          onLocAdd={() => onUpdate.addGamePiece('location')}
          onLocRemove={(keyWord: string) => onUpdate.removeGamePiece('location', keyWord)}
        />
        <CharacterControl
          characters={characters}
          onCharacteUpdate={(newChar) => onUpdate.updateGamePiece(newChar, 'character', 'characters')}
          onAddCharacter={() => onUpdate.addGamePiece('character')}
          onRemoveCharacter={(keyWord: string) => onUpdate.removeGamePiece('character', keyWord)}
          onAdvanceQueue={onUpdate.advanceQueue}
        />
        <ChoiceControl
          choices={choices}
          onChoiceUpdate={(newChoice) => onUpdate.updateGamePiece(newChoice, 'choice', 'currentChoices')}
          onAddChoice={() => onUpdate.addGamePiece('choice')}
          onRemoveChoice={(keyWord: string) => onUpdate.removeGamePiece('choice', keyWord)}
          onModeChange={onUpdate.setMode} mode={vnState.currentMode}
        />
        <GeneralControl
          vnState={vnState}
          onLoadState={onUpdate.loadState}
        />
      </div>
    </div>
  )
}

export default ControlsPage
