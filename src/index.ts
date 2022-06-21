import Block from './utils/block';

import { renderDom } from './utils/render';
import SignupPage from './pages/signup/signup-page';
import Chat from './pages/chat/chat';

document.addEventListener('DOMContentLoaded', () => {
    let currentPage: Block;

    switch(window.location.pathname) {
        case '/chat':
            currentPage = new Chat({});
            break;
        case '/':
            currentPage = new SignupPage({});
            break;
    }
    renderDom("#app", currentPage);
})


