import { BlockClass, Nullable } from '../types/common';
import Route from './route';

export default class Router {
    private static __instance: Router;
    private _currentRoute: Nullable<Route>;
    private readonly _rootQuery: string;

    public routes: Route[];
    public history: History;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: BlockClass) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            const location = (event.currentTarget as Window).location;
            this._onRoute(location.pathname, new URL(location.href).searchParams);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string, params?: URLSearchParams) {
        const route = this.getRoute(pathname);
        if (!route) {
            this._onRoute('**');
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        (route as Route).render(params);
    }

    navigate(pathname: string, params: URLSearchParams) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname, params);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string): Nullable<Route> {
        return this.routes.find(route => route.match(pathname)) ?? null;
    }
}
