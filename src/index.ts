/*if (window.location.pathname === '/') {
    window.location.replace('/login.html');
}*/

import { renderDom } from './utils/render';
import Signup from './pages/signup/signup';

document.addEventListener('DOMContentLoaded', () => {
    const page = new Signup({});

    renderDom("#app", page);
})


