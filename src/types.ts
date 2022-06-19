import { BlockEvent } from './events.enum';
import Block from './block';

export type Nullable<T> = T | null;

export type PropsObject = {[key: string | symbol]: any};

export type ChildrenObject ={
    key: string;
    block: Block;
    stab?: string;
}

export type EventsProp = {[key: string]: () => void};

export type EventBusListener = (...arg: any) => void;

export type EventBusListeners = {[key in BlockEvent]?: EventBusListener[]};
