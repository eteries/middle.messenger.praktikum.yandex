export interface Chat {
    date: string;
    messages: ChatMessage[];
}

export interface ChatMessage {
    id: string;
    time: string;
    message: string;
    isMine: boolean;
}
