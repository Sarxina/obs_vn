// src/components/SceneDisplay.tsx
'use client'

export const SceneDisplay = ({bgImage}: {bgImage: string}) => {
    return (
        <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
        </div>
    )
};
