'use client';

import { SpeakerBox } from './SpeakerBox';
import { DialogueBox } from './DialogueBox';
import { DialogueDisplayProps } from '../../types/dialogue';

export function DialogueDisplay({text, speaker}: DialogueDisplayProps) {
  return (
    <div className="absolute bottom-0 left-0 w-full h-1/3 flex flex-col justifu-end p-4">
      <div className='mb-2'>
        <SpeakerBox speaker={speaker}/>
      </div>
      <div className='flex-1'>
        <DialogueBox text={text}/>
      </div>
    </div>
  );
}
