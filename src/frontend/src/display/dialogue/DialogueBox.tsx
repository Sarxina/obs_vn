'use client';

import { TypeAnimation } from "react-type-animation";

export function DialogueBox({text} : {text: string}) {
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
        <TypeAnimation
          sequence={[text]}
          speed={50}
          wrapper="p"
          repeat={0}
        />
      </div>
    </div>
  );
}
