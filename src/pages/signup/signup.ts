import Block from '../../block';
import templateFunction from './signup.hbs';
import ui from '../../data/ui.json';
import Form from '../../components/signup-form/form';

const context = {
    ui: ui,
    children: {
        form: new Form({
            ui,
            events: {
                'click': () => console.log('clicked')
            }
        })
    }
}

export default class Signup extends Block {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return this.compile(templateFunction, {...context});
    }
}
