import EventBus from './event-bus';
import { BlockEvent } from './events.enum';
import { nanoid } from 'nanoid';
import { ChildItem, ChildrenObject, EventsProp, Indexed, Nullable } from '../types/common';

export default class Block {
    public readonly id: string;

    protected readonly props: Indexed;

    private _events: EventsProp;
    private _element: Nullable<HTMLElement> = null;
    private _children: ChildrenObject[];
    protected _eventBus: () => EventBus;
    protected _state: any;

    constructor(props: Indexed = {}) {
        const eventBus = new EventBus();
        this._eventBus = () => eventBus;

        this.id = nanoid(6);

        this.props = this._makePropsProxy(props);
        this._events = this.props && this.props.events;

        this._state = props;

        this._registerEvents(eventBus);
        this._eventBus().emit(BlockEvent.INIT);
    }

    private _init() {
        this.init();
        this._eventBus().emit(BlockEvent.FLOW_RENDER);
    }

    public init() {}

    get element() {
        return this._element;
    }

    public getContent() {
        return this.element;
    }


    protected setProps = (nextProps: Indexed) => {
        if (nextProps) {
            Object.assign(this.props, nextProps);
        }
    };


    protected _setState = (update: Indexed) => {
        this._state = {
            ...this._state,
            ...update
        }
        this._eventBus().emit(BlockEvent.FLOW_CDU);
    };

    public show() {
        if (this.element !== null) {
            this.element.style.display = 'block';
        }
    }

    public hide() {
        if (this.element !== null) {
            this.element.style.display = 'none';
        }
    }

    public dispatchComponentDidMount() {
        this._eventBus().emit(BlockEvent.FLOW_CDM);
    }

    public componentDidRender() {}

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    protected compile(generateTemplate: (context: Indexed) => string, context: Indexed): DocumentFragment {
        const templateElement = this._createDocumentElement('template') as HTMLTemplateElement;

        if (context && context.children) {
            this._children = this._mapChildrenToStabs(context.children);
            context.children = this._children.reduce((acc: Indexed, {key, block, stab}): Indexed => {
                if (Array.isArray(block)) {
                    acc[key] = [];
                    block.forEach((item) => {
                        acc[key].push(item.stab);
                    });
                }
                else {
                    acc[key] = stab;
                }
                return acc;
            }, {});
        }

        templateElement.innerHTML = generateTemplate(context);

        this._children && this._children.forEach((child: ChildrenObject) => {
            const replaceStab = (item: ChildrenObject) => {
                const stab = templateElement.content.querySelector(`[data-id="id-${item.block.id}"]`);
                if (stab) {
                    stab.replaceWith(item.block.getContent() as HTMLElement);
                }
            };
            Array.isArray(child.block)
                ? child.block.forEach(replaceStab)
                : replaceStab(child);
        });
        return templateElement.content;
    }

    protected componentDidUpdate(oldProps: Indexed, newProps: Indexed): boolean {
        return true;
    }

    // Может переопределять пользователь, необязательно трогать
    protected componentDidMount() {}

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(BlockEvent.INIT, this._init.bind(this));
        eventBus.on(BlockEvent.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(BlockEvent.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(BlockEvent.FLOW_RENDER, this._render.bind(this));
        eventBus.on(BlockEvent.DOM_READY, this._componentDidRender.bind(this));
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    private _componentDidRender() {
        this.componentDidRender();
    }

    private _componentDidUpdate(oldProps: Indexed, newProps: Indexed) {
        const componentDidUpdate = this.componentDidUpdate(oldProps, newProps);

        if (componentDidUpdate) {
            this._eventBus().emit(BlockEvent.FLOW_RENDER);
        }

        return componentDidUpdate;
    }

    private _addEvents() {
        if (this._events) {
            Object.entries(this._events).forEach(([eventName, listener]: [string, () => void]) => {
                if (this.element !== null) {
                    this.element.addEventListener(eventName, listener);
                }
            });
        }
    }

    private _removeEvents() {
        if (this._events !== undefined && this.element !== null) {
            Object.entries(this._events).forEach(([eventName, listener]: [string, () => void]) => {
                if (this.element !== null) {
                    this.element.removeEventListener(eventName, listener);
                }
            });
        }
    }

    private _render() {
        this._removeEvents();
        this._events = this.props && this.props.events;

        const newElement = this.render().firstElementChild as HTMLElement;
        if (this._element !== null) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;
        this._addEvents();
        this._eventBus().emit(BlockEvent.DOM_READY);
    }

    private _makePropsProxy = (props = {}) => {
        const eventBus = this._eventBus();
        return new Proxy(props, {
            get(target: Indexed, prop: keyof Indexed) {
                return target[prop];
            },
            set(target: Indexed, prop: keyof Indexed, value: any) {
                const old = {...this.props};
                target[prop] = value;
                eventBus.emit(BlockEvent.FLOW_CDU, old, target);
                return true;
            },
            deleteProperty() {
                throw new Error('нет доступа');
            }
        })
    }

    private _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    private _mapChildrenToStabs(children: ChildItem | ChildItem[]): any {
        const mapper = (([key, value]: [string, Block]) => (
            {
                key,
                block: value,
                stab: `<div data-id="id-${value.id}"></div>`
            })
        );
        return Object.entries(children).map(([key, value]) => {
            if (value instanceof Block) {
                return mapper([key, value]);
            }
            else {
                return {
                    key,
                    block: Object.entries(value).map(mapper)
                }
            }
        });
    }
}
