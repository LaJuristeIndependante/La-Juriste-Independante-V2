export interface BackgroundBubblesProps {
    page: 'landing' | 'specContract' | 'contracts';
}

export interface ErrorResponse {
    message: string;
}

export interface FlashMessage {
    title: string;
    content: string;
    icon: string;
}