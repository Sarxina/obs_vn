'use client';

export interface SingleCharacterDisplayProps {
    name: string
    image: string
};

export function SingleCharacterDisplay({ image, name }: SingleCharacterDisplayProps) {
  return (
    <div className='h-full'>
      <img
        src={image}
        alt={name}
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
