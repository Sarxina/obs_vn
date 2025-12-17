'use client';

import { Typewriter } from "react-simple-typewriter";

interface DialogueBoxProps {
  text: string
};

export function DialogueBox({text} : DialogueBoxProps) {
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
      <div className="text-center leading-relaxed">
        <Typewriter
          key={text}
          words={[text]}
          typeSpeed={40}
        />
      </div>
    </div>
  );
}
