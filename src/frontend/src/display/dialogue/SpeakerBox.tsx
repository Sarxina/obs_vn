'use client';

export function SpeakerBox({speaker, chatter}: {speaker: string, chatter?: string}) {
  return (
    <div
      className="
        bg-orange-500/80
        text-white
        font-bold
        text-xl
        px-5
        py-3
        inline-block
        shadow-lg
        border-2
        border-orange-600/90
        rounded-sm
      "
    >
      {speaker}
      {chatter && (
        <div className="text-sm font-normal opacity-80">({chatter})</div>
      )}
    </div>
  );
}
