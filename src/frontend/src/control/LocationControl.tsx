
'use client'

import { LocationData } from "../../../common/types"

interface LocationControlProps {
    locationOptions: LocationData[]
    currentLocation: string
    onLocationUpdate: (newLocation: LocationData) => void
    onLocationChange: (keyWord: string) => void
}

export const LocationControl = ({
    locationOptions, 
    currentLocation, 
    onLocationUpdate, 
    onLocationChange
}: LocationControlProps) => {
    return (
        <div>
            
        </div>
    )
}