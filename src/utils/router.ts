import { BlockClass, Nullable } from '../types/common';
import Route from './route';
import AuthService, { AuthStatus } from '../services/auth-service';
import EventBus from './event-bus';

export enum RouterEvent {
    Change = 'open'
}

export default class Router extends EventBus {
    private static __instance: Router;
    private _currentRoute: Nullable<Route>;
    private readonly _rootQuery: string;
    private readonly _authService: AuthService;

    public routes: Route[];
    public history: History;
    public location: Location;

    public constructor(rootQuery = '#app') {
        super();

        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this.location = window.location;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        this._authService = new AuthService();

        Router.__instance = this;
    }

    public use(pathname: string, block: BlockClass, isPrivate = false) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery}, isPrivate);

        this.routes.push(route);

        return this;
    }

    public start() {
        window.onpopstate = (event: PopStateEvent) => {
            this._onRoute(location.pathname);
        };

        window.addEventListener('click', (event: PointerEvent) => {
            const link = (event.target as HTMLElement).closest('.js-router-link');
            if (!link) {
                return;
            }
            event.preventDefault();
            const url = link.getAttribute('href');
            if (url) {
                this.navigate(url);
            }
        });

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string) {
        const pathAndParams = pathname.split('?');
        const route = this.getRoute(pathAndParams[0]);

        if (!route) {
            this._onRoute('**');
            return;
        }

        if (route.isPrivate && this._authService.authStatus === AuthStatus.NO_AUTH) {
            this._onRoute('/');
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();

        }

        this._currentRoute = route;
        this.emit(RouterEvent.Change);

        (route as Route).render();
    }

    public navigate(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    public back() {
        this.history.back();
    }

    public forward() {
        this.history.forward();
    }

    public getRoute(pathname: string): Nullable<Route> {
        return this.routes.find(route => route.match(pathname)) ?? null;
    }
}
