import Block from '../../utils/block';
import templateFunction from './input.hbs';
import { nanoid } from 'nanoid';
import { style } from './input.css';

interface InputProps {
    label: string;
    type: string;
    message: string;
    pattern: RegExp;

}

export default class Input extends Block {
    private _control: HTMLInputElement;
    private _id: string;

    constructor(props: InputProps) {
        super(props);
    }

    public init() {
        this._id = nanoid(6);
        this._setState({
            ...this.props,
            id: this._id,
            isTextarea: this.props.type === 'textarea',
            style
        });
    }

    public get value() {
        return this._control.value;
    }

    public render() {
        return this.compile(templateFunction, this._state);
    }

    public validate() {
        if (this._control.value.match(this.props.pattern)) {
            return true;
        }
        else {
            this._control.classList.add('validated');
            return false;
        }
    }

    public cleanValidation() {
        this._control.classList.remove('validated');
    }

    private _addInnerListeners() {
        this._control = this.element.querySelector(`[id="input-${this._id}"]`);
        this._control.addEventListener('blur', () => this.validate());
        this._control.addEventListener('focus', () => this.cleanValidation());
    }

    componentDidRender() {
        this._addInnerListeners();
    }
}
