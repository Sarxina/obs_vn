'use client';

import Image from 'next/image';


export interface SingleCharacterDisplayProps {
    image: string
};

export const SingleCharacterDisplay = ({image}: SingleCharacterDisplayProps)  => {
    return (
        <div className="relative pointer-events-none w-full h-full">
            <Image
                src={image}
                alt=""
                fill
                style={{ objectFit: 'contain'}}
                priority
            />
        </div>
    )
}
