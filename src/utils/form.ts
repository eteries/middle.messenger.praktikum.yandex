import Block from './block';
import Input from '../components/input/input';
import { Indexed } from '../types/common';

interface FormProps extends Indexed {
    events: {
        submit: (evt: SubmitEvent) => void
    };
    children?: Indexed;
}

export default class Form extends Block {
    protected _controls: Record<string, Input>
    constructor(props: FormProps) {
        super(props);
    }

    public get value() {
        return Object.entries(this._controls).reduce<Record<string, string>>((acc, [name, input]) => {
            acc[name] = input.value;
            return acc;
        }, {});
    }

    public get isValid() {
        return Object.values(this._controls).every((value) => value.validate());
    }
}
