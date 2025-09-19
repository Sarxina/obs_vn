import { connectOBS } from "@/lib/obsClient";
import { NextResponse } from "next/server";
import OBSWebSocket from "obs-websocket-js"

export const toggleChoices = async (obs: OBSWebSocket, data: { enabled: boolean }) => {
    const { enabled } = data;
    
    const sceneItems = await obs.call('GetSceneItemList', {
        sceneName: 'Full Right Game'
    });

    const textBoxGroup = sceneItems.sceneItems.find(item => item.sourceName === 'Choice Box Group');

    if (!textBoxGroup || typeof textBoxGroup.sceneItemId !== 'number') {
        throw new Error('Choice box group not found in the scene');
    }
    const groupId = textBoxGroup.sceneItemId;

    await obs.call('SetSceneItemEnabled', {
        sceneName: 'Full Right Game',
        sceneItemId: groupId,
        sceneItemEnabled: enabled
    });

    return NextResponse.json({ ok: true });
}

export const toggleTextBox = async (obs: OBSWebSocket, data: { enabled: boolean }) => {
    const { enabled } = data;

    const sceneItems = await obs.call('GetSceneItemList', {
        sceneName: 'Full Right Game'
    });

    const textBoxGroup = sceneItems.sceneItems.find(item => item.sourceName === 'Text Box Group');

    if (!textBoxGroup || typeof textBoxGroup.sceneItemId !== 'number') {
        throw new Error('Text box group not found in the scene');
    }
    const groupId = textBoxGroup.sceneItemId;

    await obs.call('SetSceneItemEnabled', {
        sceneName: 'Full Right Game',
        sceneItemId: groupId,
        sceneItemEnabled: enabled
    });

    return NextResponse.json({ ok: true });
}


// Map of different control functions
const controlMap: Record<string, (obs: OBSWebSocket, data: any) => Promise<NextResponse>> = {
    'raiseTextBox': toggleTextBox,
    'toggleChoices': toggleChoices,
    // Add more controls as needed
};

export const PATCH = async (req: Request) => {
    const body = await req.json();
    const obs = await connectOBS();

    console.log(body)
    
    for (const key of Object.keys(body)) {
        return controlMap[key]?.(obs, body[key]);
    }
}