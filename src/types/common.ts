import { BlockEvent } from '../utils/events.enum';
import Block from '../utils/block';
import { MethodHTTP } from '../constants';
import { StoreEvent } from '../store/store';


export type Indexed = {[key: string | symbol]: any};

export type ChildrenObject = {
    key: string;
    block: Block;
    stab?: string;
}

export type ChildItem = Record<string, Block>;

export type EventsProp = {[key: string]: (event?: Event) => void};

export type EventBusListener = (...arg: any) => void;

export type EventBusListeners = {[key in (BlockEvent | StoreEvent)]?: EventBusListener[]};

export type RequestOptions = {
    headers?: Record<string, string>;
    method?: MethodHTTP;
    timeout?: number;
    data?: any,
    credentials?: string,
    mode?: string

};

export type Nullable<T> = T | null;

export type BlockClass = {
    new(props?: Indexed): Block;
}
