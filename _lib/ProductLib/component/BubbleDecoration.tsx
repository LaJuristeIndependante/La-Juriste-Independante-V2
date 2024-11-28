import React from "react";

interface BubbleBackgroundProps {
    size: number;        // Taille de la bulle
    position: string;    // Position de la bulle (ex : "right-10 bottom-10")
    color?: string;      // Couleur de la bulle (par défaut : rouge)
    shadow?: boolean;    // Activer/désactiver l'ombre (par défaut : activé)
    opacity?: number;    // Opacité optionnelle (par défaut : 0.7)
}

const BubbleDecoration: React.FC<BubbleBackgroundProps> = ({
                                                               size,
                                                               position,
                                                               color = "#A00C30",  // Couleur par défaut si aucune n'est fournie
                                                               shadow = true,       // Ombre activée par défaut
                                                               opacity = 0.7        // Opacité par défaut à 0.7
                                                           }) => {
    return (
        <div
            className={`absolute rounded-full ${position} ${shadow ? "shadow-lg" : ""} z-0`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                opacity: opacity, // Opacité configurable
            }}
        />
    );
};

export default BubbleDecoration;
