import Block from './block';
import { Nullable, Indexed, BlockClass } from '../types/common';
import { renderDom } from './render';

export default class Route {
    public isPrivate: boolean;
    private readonly _blockClass: BlockClass;
    private _pathname: string;
    private _block: Nullable<Block>;
    private _props: Indexed;

    public constructor(pathname: string, view: BlockClass, props: Indexed, isPrivate: boolean) {
        this.isPrivate = isPrivate;
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    public navigate(pathname: string) {
        if (!this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    public leave() {
        this._block = null;
    }

    public match(pathname: string) {
        return pathname === this._pathname;
    }

    public render() {
        if (!this._block) {
            this._block = new this._blockClass();
            renderDom(this._props.rootQuery, this._block as Block);
            return;
        }

        this._block.show();
    }
}
