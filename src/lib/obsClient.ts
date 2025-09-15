import OBSWebSocket from 'obs-websocket-js';

const obs = new OBSWebSocket();

export async function connectOBS() {
    await obs.connect('ws://127.0.0.1:4455', process.env.NEXT_PUBLIC_OBS_PASSWORD);
    return obs;
}
