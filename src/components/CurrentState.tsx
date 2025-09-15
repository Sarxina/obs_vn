'use client'

import { useState } from "react"

export const CurrentState = () => {
    const [value, setValue] = useState('');

    async function sendText() {
        await fetch('api/obs/text', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ text: value })
        });
        setValue('');
    }

    return (
        <div>
            <h2>Current State</h2>
            <div>
                <button>Toggle Choice</button>
                <button>Toggle NPC</button>
                <input
                    placeholder="New OBS text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button
                    onClick={sendText}
                />
            </div>
        </div>
    )
}
