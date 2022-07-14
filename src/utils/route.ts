import Block from './block';
import { Nullable, Indexed, BlockClass } from '../types/common';
import { renderDom } from './render';

export default class Route {
    private readonly _blockClass: BlockClass;
    private _pathname: string;
    private _block: Nullable<Block>;
    private _props: Indexed;

    constructor(pathname: string, view: BlockClass, props: Indexed) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (!this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render(params?: URLSearchParams) {
        if (!this._block) {
            this._block = new this._blockClass({params});
            renderDom(this._props.rootQuery, this._block as Block);
            return;
        }

        this._block.show();
    }
}
