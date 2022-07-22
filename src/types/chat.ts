import { UserValueDTO } from './user';
import { Nullable } from './common';
import store from '../store/store';

export interface Chat {
    date: string;
    messages: ChatMessage[];
}

export interface ChatMessageDTO {
    id: number;
    user_id: number,
    chat_id: number,
    type: string,
    time: string;
    content: string;
    is_read: boolean;
    file: Nullable<string>;
}

export interface ChatMessage {
    id: number;
    userId: number,
    chatId: number,
    type: string,
    time: string;
    content: string;
    isRead: boolean;
    file: Nullable<string>;
    isMine: boolean;
}

export const mapChatMessageDTOToChatMessage = (dto: ChatMessageDTO) => {
    return {
        ...dto,
        userId: dto.user_id,
        chatId: dto.chat_id,
        isRead: dto.is_read,
        isMine: dto.user_id === store.getState()?.user?.id,
    }
}

export const mapChatMessageToChatMessageDTO = (message: ChatMessage) => {
    return {
        ...message,
        user_id: message.userId,
        chat_id: message.chatId
    }
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

export interface Connect {
    token: string;
}
