import { UserValueDTO } from './user';

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

export interface ChatDTO {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
        user: UserValueDTO,
        time: string,
        content: string
    }
}

export interface ChatValueDTO {
    title: string;
}
