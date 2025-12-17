'use client';
import { motion } from 'framer-motion';

export interface SingleCharacterDisplayProps {
    name: string
    image: string
    isSpeaking: boolean
};

export function SingleCharacterDisplay({ image, name, isSpeaking }: SingleCharacterDisplayProps) {
  console.log(isSpeaking)
  return (
    <div className='h-full flex items-end'>
      <motion.img
        src={`characters/${image}`}
        alt={name}
        className='object-bottom'
        animate={isSpeaking ? "speaking" : "idle"}
        variants={{
          idle: {
              scaleY: 1,
              scaleX: 1,
          },
          speaking: {
              scaleY: [1, 0.8, 1.2, 0.9, 1.1],
              scaleX: [1, 1.2, 0.8, 1.1, 0.9]
          }
        }}
        transition={{
          duration: 0.4,
          repeat: isSpeaking ? Infinity: 0,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        style={{ transformOrigin: "center bottom"}}
      />
    </div>
  );
}
