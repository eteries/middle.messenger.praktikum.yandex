import Block from './utils/block';

import { renderDom } from './utils/render';
import SignupPage from './pages/signup/signup-page';
import ChatPage from './pages/chat/chat';
import LoginPage from './pages/login/login';
import UserPage from './pages/user/user';
import Error404 from './pages/404/error-404';
import Error500 from './pages/500/error-500';

document.addEventListener('DOMContentLoaded', () => {
    let currentPage: Block;

    switch(window.location.pathname) {
        case '/chat.html':
            currentPage = new ChatPage();
            break;
        case '/login.html':
            currentPage = new LoginPage();
            break;
        case '/user.html':
            currentPage = new UserPage();
            break;
        case '/404.html':
            currentPage = new Error404();
            break;
        case '/500.html':
            currentPage = new Error500();
            break;
        case '/':
        default:
            currentPage = new SignupPage();
            break;
    }
    renderDom("#app", currentPage);
})


