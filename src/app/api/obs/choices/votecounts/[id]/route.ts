import { connectOBS } from "@/lib/obsClient";
import { NextResponse } from "next/server";

export const PATCH = async (
    req: Request,
    { params }: { params: { id: string } }
) => {
    const { voteCount } = await req.json();
    const { id } = await params;
    
    const obs = await connectOBS();
    await obs.call('SetInputSettings', {
        inputName: `Choice ${id} Votes`,
        inputSettings: { text: voteCount.toString() }
    })
    return NextResponse.json({ ok: true });