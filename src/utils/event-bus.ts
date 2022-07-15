import { BlockEvent } from './events.enum';
import { EventBusListener, EventBusListeners } from '../types/common';
import { StoreEvent } from '../store/store';

export default class EventBus {
    private readonly listeners: EventBusListeners

    constructor() {
        this.listeners = {};
    }

    public on(event: BlockEvent | StoreEvent, callback: EventBusListener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    public off(event: BlockEvent | StoreEvent, callback: EventBusListener) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
    }

    public emit(event: BlockEvent | StoreEvent, ...args: any[]) {
        if (this.listeners[event] && this.listeners[event].length > 0) {
            this.listeners[event].forEach((listener) => listener(...args));
        }
    }
}

