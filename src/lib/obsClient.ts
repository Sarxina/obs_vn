import OBSWebSocket from 'obs-websocket-js';

const obs = new OBSWebSocket();
let isConnected = false;

export async function connectOBS() {
    if (isConnected) {
        return obs;
    }
    try {
        const password = process.env.NEXT_PUBLIC_OBS_PASSWORD || '';
        await obs.connect('ws://127.0.0.1:4455', password);
        isConnected = true
    }
}
