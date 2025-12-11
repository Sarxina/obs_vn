'use client';

export function SpeakerBox({speaker}: {speaker: string}) {
  return (
    <div
      className="
        bg-orange-500/80
        text-white
        font-bold
        text-lg
        px-4
        py-2
        inline-block
        shadow-lg
        border-2
        border-orange-600/90
        rounded-sm
      "
    >
      {speaker}
    </div>
  );
}
