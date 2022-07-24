import { UserValueDTO } from './user';
import { Indexed, Nullable } from './common';
import store from '../store/store';
import { formatLastMessageDate } from '../utils/date';

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

export const mapChatDTOToChat = (dto: ChatDTO) => {
    const chat: Indexed =  {
        ...dto,
        unreadCount: dto.unread_count
    };

    if (dto.last_message) {
        chat.lastMessage = {
        ...dto.last_message,
                time: formatLastMessageDate(dto.last_message?.time),
                user: {
            ...dto.last_message?.user,
                    firstName: dto.last_message?.user?.first_name,
                    lastName: dto.last_message?.user?.second_name,
            }
        }
    }

    return chat;
}


export interface ChatValueDTO {
    title: string;
}

export interface Connect {
    token: string;
}
