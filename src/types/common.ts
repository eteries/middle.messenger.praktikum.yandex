import { BlockEvent } from '../utils/events.enum';
import Block from '../utils/block';
import { MethodHTTP } from '../constants';


export type Indexed = {[key: string | symbol]: any};

export type ChildrenObject = {
    key: string;
    block: Block;
    stab?: string;
}

export type ChildItem = Record<string, Block>;

export type EventsProp = {[key: string]: (event?: Event) => void};

export type EventBusListener = (...arg: any) => void;

export type EventBusListeners = {[key in BlockEvent]?: EventBusListener[]};

export type RequestOptions = {
    headers?: Record<string, string>;
    method?: MethodHTTP;
    timeout?: number;
    data?: any
};

export type Nullable<T> = T | null;

export type BlockClass = {
    new(props?: Indexed): Block;
}
