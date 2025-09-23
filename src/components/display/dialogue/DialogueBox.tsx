'use client';

export function DialogueBox() {
  return (
    <div
      className="
        bg-blue-900/70
        text-white
        font-bold
        text-2xl
        p-8
        w-full
        h-full
        shadow-xl
        border-4
        border-blue-800/80
        rounded-md
        flex items-center
        justify-center
      "
    >
      <p className="text-center leading-relaxed">
        Sample dialogue streamed from chat
      </p>
    </div>
  );
}
