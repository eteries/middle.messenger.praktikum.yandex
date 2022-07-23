export const formatChatMessageDate = (ISODate: string) => {
    const date = new Date(ISODate);
    return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}

export const formatLastMessageDate = (ISODate: string) => {
    const date = new Date(ISODate);
    return `${date.getHours().toString().padEnd(2, '0')}:${date.getMinutes().toString().padEnd(2, '0')}`;
}
