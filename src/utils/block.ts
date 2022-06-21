import EventBus from './event-bus';
import { BlockEvent } from './events.enum';
import { nanoid } from 'nanoid';
import { ChildrenObject, EventsProp, PropsObject } from './types';

export default class Block<Props extends PropsObject = {}> {
    public readonly id: string;

    protected readonly props: any;
    protected children: ChildrenObject[];

    private readonly _meta: {props: Props} = null;
    private _events: EventsProp;
    private _element: HTMLElement = null;
    protected _eventBus: () => EventBus;
    protected _state: any;

    constructor(props: Props) {
        const eventBus = new EventBus();
        this._eventBus = () => eventBus;

        this.id = nanoid(6);

        this.props = this._makePropsProxy(props);
        this._events = this.props?.events;
        this._meta = {
            props
        };

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


    protected setProps = (nextProps: PropsObject) => {
        if (nextProps) {
            Object.assign(this.props, nextProps);
        }
    };


    protected _setState = (update: PropsObject) => {
        this._state = {
            ...this._state,
            ...update
        }
        this._eventBus().emit(BlockEvent.FLOW_CDU);
    };

    public show() {
        this.element.style.display = 'block';
    }

    public hide() {
        this.element.style.display = 'none';
    }

    public dispatchComponentDidMount() {
        this._eventBus().emit(BlockEvent.FLOW_CDM);
    }

    public componentDidRender() {}

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    protected compile(generateTemplate: (context: PropsObject) => string, context: PropsObject): DocumentFragment {
        const templateElement = this._createDocumentElement('template') as HTMLTemplateElement;

        if (context?.children) {
            context.children = this._mapChildrenToStabs(context.children);
        }

        templateElement.innerHTML = generateTemplate(context);

        this.children?.forEach((child) => {
            const stab = templateElement.content.querySelector(`[data-id="id-${child.block.id}"]`);
            if (stab) {
                stab.replaceWith(child.block.getContent());
            }
        })

        return templateElement.content;
    }

    protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
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

    private _componentDidUpdate(oldProps: Props, newProps: Props) {
        const componentDidUpdate = this.componentDidUpdate(oldProps, newProps);

        if (componentDidUpdate) {
            this._eventBus().emit(BlockEvent.FLOW_RENDER);
        }

        return componentDidUpdate;
    }

    private _addEvents() {
        if (this._events) {
            Object.entries(this._events).forEach(([eventName, listener]: [string, () => void]) => {
                this.element.addEventListener(eventName, listener);
            });
        }
    }

    private _removeEvents() {
        if (this._events !== undefined && this.element !== null) {
            Object.entries(this._events).forEach(([eventName, listener]: [string, () => void]) => {
                this.element.removeEventListener(eventName, listener);
            });
        }
    }

    private _render() {
        this._removeEvents();
        this._events = this.props?.events;

        const newElement = this.render().firstElementChild as HTMLElement;
        if (this._element !== null) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;
        this._addEvents();
        this._eventBus().emit(BlockEvent.DOM_READY);
    }

    private _makePropsProxy = (props: Props) => {
        const eventBus = this._eventBus();
        return new Proxy(props, {
            get(target: Props, prop: keyof Props) {
                return target[prop];
            },
            set(target: Props, prop: keyof Props, value: any) {
                const old = {...this.props};
                target[prop] = value;
                eventBus.emit(BlockEvent.FLOW_CDU, old, target);
                return true;
            },
            deleteProperty(target, property) {
                throw new Error('нет доступа');
            }
        })
    }

    private _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    private _mapChildrenToStabs(children: Record<string, Block>) {
        this.children = Object.entries(children).map(([key, block]: [string, Block]) => ({
            key,
            block,
            stab: `<div data-id="id-${block.id}"></div>`
        }));

        return this.children.reduce((acc:any, child: ChildrenObject) => {
            acc[child.key] = child.stab;
            return acc;
        }, {})
    }
}
