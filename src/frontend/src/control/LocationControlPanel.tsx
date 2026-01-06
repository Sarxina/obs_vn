'use client'

import type { LocationData } from "../../../common/types"
import { RemoveButton, SimpleTextInput } from "./Utils"

interface LocationControlProps {
    location: LocationData
    currentLoc: string
    onLocSelection: (locSelection: string) => void
    onLocUpdate: (newLocation: LocationData) => void
    onLocRemove: (keyword: string) => void
}

export const LocationControlPanel = ({
    location,
    currentLoc,
    onLocSelection,
    onLocUpdate,
    onLocRemove
}: LocationControlProps) => {
    return (
        <div className="flex flex-wrap gap-3 items-end p-3 bg-white bg-opacity-50 rounded-md">
            <SimpleTextInput
                labelName="Location Name"
                obj={location}
                objKey="name"
                key="name"
                onChange={onLocUpdate}
            />
            <SimpleTextInput
                labelName="Location Image"
                obj={location}
                objKey="image"
                key="image"
                onChange={onLocUpdate}
            />
            <label className="flex items-center gap-2 pb-2">
                <input
                    type="radio"
                    name="locSelection"
                    value={location.keyWord}
                    checked={currentLoc === location.keyWord}
                    onChange={(e) => onLocSelection(e.target.value)}
                    className="w-4 h-4"
                />
                <span className="text-sm font-medium">Active</span>
            </label>
            <RemoveButton onClick={() => onLocRemove(location.keyWord)}/>
        </div>
    )
}
