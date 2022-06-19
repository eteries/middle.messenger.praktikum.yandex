import Block from '../../block';
import templateFunction from '../../partials/signup-form.hbs';

interface FormProps {
    ui: any;
    events?: {
        click?: () => void
    }
}

export default class Form extends Block<FormProps> {
    constructor(props: FormProps) {
        super(props);
    }

    public render() {
        return this.compile(templateFunction, {...this.props});
    }
}
