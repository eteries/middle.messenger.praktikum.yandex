export const formatChatMessageDate = (ISODate: string) => {
    const date = new Date(ISODate);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export const formatLastMessageDate = (ISODate: string) => {
    const date = new Date(ISODate);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}
