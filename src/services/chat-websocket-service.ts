import EventBus from '../utils/event-bus';

export enum SocketEvent {
    Open = 'open',
    Message = 'message'
}

export default class WebSocketService extends EventBus {
    private readonly _socket: WebSocket;
    private _timer: number;

    public constructor(chatId: number, userId: number, token: string) {
        super();

        this._socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

        this._setListeners();

    }

    public send(message: string) {
        this._socket.send(JSON.stringify({
            type: 'message',
            content: message
        }))
    }


    public getMessages(offset = 0) {
        this._socket.send(JSON.stringify({
            type: "get old",
            content: offset
        }));
    }

    public disconnect() {
        window.clearInterval(this._timer);
    }

    private _ping() {
        this._socket.send(JSON.stringify({
            type: 'ping'
        }))
    }

    private _setListeners() {
        this._socket.addEventListener('open', (event) => {
            new Notification('Соединение установлено');
            this.emit(SocketEvent.Open);
            this._timer = setInterval(() => this._ping(), 30000);
        });

        this._socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения', event);
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            this.disconnect();
        });

        this._socket.addEventListener('message', event => {
            console.log('Получены данные', event.data);
            this.emit(SocketEvent.Message, JSON.parse(event.data));
        });

        this._socket.addEventListener('error', event => {
            console.log('Ошибка', event);
        });
    }
}
