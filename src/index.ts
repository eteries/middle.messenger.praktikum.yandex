import IndexPage from './pages/index/index';
import SignupPage from './pages/signup/signup-page';
import ChatPage from './pages/chat/chat';
import LoginPage from './pages/login/login';
import UserPage from './pages/user/user';
import Error404 from './pages/404/error-404';
import Error500 from './pages/500/error-500';
import Router from './utils/router';
import AuthService from './services/auth-service';
import store from './store/store';

const router = new Router("#app");
const authService = new AuthService();

document.addEventListener('DOMContentLoaded', () => {
    if (!store.getState().user) {
        authService.getCurrentUser();
    }

    router
        .use('/', IndexPage)
        .use('/chat.html', ChatPage, true)
        .use('/login.html', LoginPage)
        .use('/signup.html', SignupPage)
        .use('/user.html', UserPage, true)
        .use('/500.html', Error500)
        .use('**', Error404)
        .start();
});
