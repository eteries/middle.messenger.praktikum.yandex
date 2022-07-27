import { AppEvent, EventBusListener, EventBusListeners } from '../types/common';

export default class EventBus {
    private readonly listeners: EventBusListeners

    constructor() {
        this.listeners = {};
    }

    public on(event: AppEvent, callback: EventBusListener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    public off(event: AppEvent, callback: EventBusListener) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
    }

    public emit(event: AppEvent, ...args: any[]) {
        if (this.listeners[event] && this.listeners[event].length > 0) {
            this.listeners[event].forEach((listener) => listener(...args));
        }
    }
}

