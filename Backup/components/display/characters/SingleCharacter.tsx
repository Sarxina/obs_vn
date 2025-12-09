'use client';

import Image from 'next/image';

export interface SingleCharacterDisplayProps {
    name: string
    image: string
};

export function SingleCharacterDisplay({ image, name }: SingleCharacterDisplayProps) {
  return (
    <div className='h-full'>
      <Image
        src={image}
        alt={name}
        width={1406}
        height={4160}
        style={{
          clipPath: 'inset(0 0 40% 0)',
          width: '100%',
          height: '167%',
          marginBottom: '-67%'
        }}
      />
    </div>
  );
}
