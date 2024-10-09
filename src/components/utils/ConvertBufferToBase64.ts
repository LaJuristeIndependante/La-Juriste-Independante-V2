export const convertBufferToBase64 = (buffer: ArrayBuffer): string => {
    return buffer
        ? `data:image/jpeg;base64,${Buffer.from(buffer).toString('base64')}`
        : "/default-image.jpg"; // Fallback si aucune image n'est disponible
};
