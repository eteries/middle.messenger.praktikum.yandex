import { Indexed } from '../types/common';
import { set } from '../utils/deep';
import EventBus from '../utils/event-bus';

export enum StoreEvent {
    Updated = 'updated',
}

class Store extends EventBus {
    private _state: Indexed = {};

    public getState() {
        return this._state;
    }

    public set(path: string, value: unknown) {
        set(this._state, path, value);
        this.emit(StoreEvent.Updated);
    };
}

export default new Store();
