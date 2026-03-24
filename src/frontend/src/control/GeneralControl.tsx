'use client'

import { useRef } from "react"
import { VNStateData } from "../../../common/types"

interface GeneralControlProps {
    vnState: VNStateData
    onLoadState: (state: VNStateData) => void
    onHowToJoin: () => void
}

export const GeneralControl = ({ vnState, onLoadState, onHowToJoin }: GeneralControlProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSave = () => {
        const json = JSON.stringify(vnState, null, 2)
        const blob = new Blob([json], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'vn-state.json'
        a.click()
        URL.revokeObjectURL(url)
    }

    const handleLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (event) => {
            const state = JSON.parse(event.target?.result as string) as VNStateData
            onLoadState(state)
        }
        reader.readAsText(file)
        e.target.value = ''
    }

    return (
        <div className="bg-red-50 rounded-lg flex flex-col gap-3 p-4 border-2 border-red-300 shadow-sm">
            <h2 className="text-lg font-semibold text-red-900 mb-2">General Controls</h2>
            <div className="flex gap-3">
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:opacity-80 transition-colors"
                >
                    Save State
                </button>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-red-400 text-white font-semibold rounded-md hover:opacity-80 transition-colors"
                >
                    Load State
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleLoad}
                />
                <button
                    onClick={onHowToJoin}
                    className="px-4 py-2 bg-red-400 text-white font-semibold rounded-md hover:opacity-80 transition-colors"
                >
                    Post How To Join
                </button>
            </div>
        </div>
    )
}
