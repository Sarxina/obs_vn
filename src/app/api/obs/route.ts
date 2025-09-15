import { connectOBS } from '@/lib/obsClient';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { text } = await req.json();

    const obs = await connectOBS();
    await obs.call('SetInputSettings', {
        inputName: 'Test Text',
        inputSettings: { text }
    });

    return NextResponse.json({ ok: true });
}
