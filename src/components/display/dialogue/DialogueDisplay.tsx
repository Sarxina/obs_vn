'use client';

import { SpeakerBox } from './SpeakerBox';
import { DialogueBox } from './DialogueBox';

export function DialogueDisplay() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-1/3 flex flex-col justifu-end p-4">
      <div className='mb-2'>
        <SpeakerBox />
      </div>
      <div className='flex-1'>
        <DialogueBox />
      </div>
    </div>
  );
}
