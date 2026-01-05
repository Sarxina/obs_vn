
'use client'

import { LocationData } from "../../../common/types"

interface LocationControlProps {
    locationOptions: LocationData[]
    currentLocation: number
    onLocationUpdate: (newLocation: LocationData) => void
    onLocationChange: (keyWord: string) => void
}

export const LocationControl = ({
    locationOptions,
    currentLocation,
    onLocationUpdate,
    onLocationChange
}: LocationControlProps) => {
    console.log(locationOptions)
    console.log(currentLocation)
    console.log(onLocationChange)
    console.log(onLocationUpdate)
    return (
        <div>
            Temp
            locationOptions[currentLocation]
        </div>
    )
}
