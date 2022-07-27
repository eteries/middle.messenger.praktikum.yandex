import Block from './block';

export const renderDom = (rootSelector: string, component: Block) => {
    const root = document.querySelector(rootSelector);

    if (root === null) {
        throw new Error('Root has not found');
    }

    root.innerHTML = '';

    const element = component.getContent();

    if (element) {
        root.append(element);
    }

    component.dispatchComponentDidMount();
};
