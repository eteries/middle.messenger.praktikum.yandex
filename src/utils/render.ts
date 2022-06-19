import Block from '../block';

export const renderDom = (rootSelector: string, component: Block) => {
    const root = document.querySelector(rootSelector);

    if (root === null) {
        throw new Error('Root has not found');
    }

    root.innerHTML = '';

    root.append(component.getContent());
    component.dispatchComponentDidMount();
};
