// src/components/SceneDisplay.tsx
'use client';

interface SceneDisplayProps {
  bgImage: string | undefined;
}

export function SceneDisplay({ bgImage }: SceneDisplayProps) {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: bgImage ? `url(locations/${bgImage})` : undefined }}
    />
  );
}
