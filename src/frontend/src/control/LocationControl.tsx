
'use client'

import { LocationData } from "../../../common/types"
import { LocationControlPanel} from "./LocationControlPanel"
import { AddButton } from "./Utils"

interface LocationControlProps {
    locOptions: LocationData[]
    currentLoc: string
    onLocUpdate: (newLocation: LocationData) => void
    onLocSelection: (keyWord: string) => void
    onLocAdd: () => void
    onLocRemove: (keyWord: string) => void
}

export const LocationControl = ({
    locOptions,
    currentLoc,
    onLocSelection,
    onLocUpdate,
    onLocAdd,
    onLocRemove
}: LocationControlProps) => {
    return (
        <div className="bg-blue-50 rounded-lg flex flex-col gap-3 p-4 border-2 border-blue-300 shadow-sm">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Locations</h2>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-96">
                {locOptions
                 .map((loc) => (
                    <LocationControlPanel
                        location={loc}
                        currentLoc={currentLoc}
                        key={loc.keyWord}
                        onLocSelection={onLocSelection}
                        onLocUpdate={onLocUpdate}
                        onLocRemove={onLocRemove}
                    />
                 ))}
            </div>
            <AddButton
                onClick={onLocAdd}
            />
        </div>
    )
}
