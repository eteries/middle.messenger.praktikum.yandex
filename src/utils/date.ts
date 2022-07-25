export const formatChatMessageDate = (ISODate: string) => {
    const date = new Date(ISODate);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}

export const formatLastMessageDate = (ISODate: string) => {
    const date = new Date(ISODate);
    return `${date.getHours().toString().padEnd(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}
