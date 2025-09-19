import { connectOBS } from '@/lib/obsClient';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { text, speakerName } = await req.json();

    const obs = await connectOBS();
    await obs.call('SetInputSettings', {
        inputName: 'SpeakerName',
        inputSettings: { text: speakerName }
    });
    await obs.call('SetInputSettings', {
        inputName: 'SpeakerText',
        inputSettings: { text }
    });
    return NextResponse.json({ ok: true });
}
