import React from "react";

interface BubbleBackgroundProps {
    size: number;
    position: string;
    color?: string; // optionnel, pour changer la couleur par défaut
    shadow?: boolean; // optionnel, pour activer/désactiver l'ombre
}

export default function BubbleBackground({
                                             size,
                                             position,
                                             color = "#DA1A32",
                                             shadow = true
                                         }: BubbleBackgroundProps) {
    return (
        <div
            className={`absolute rounded-full z-1 flex ${position} ${shadow ? "shadow-lg" : ""}`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
            }}
        />
    );
}
