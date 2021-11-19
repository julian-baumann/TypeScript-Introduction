export class HTMLRenderer
{
    public static getOrCreateElement<T extends HTMLElement>(selector: string, elementTag: keyof HTMLElementTagNameMap, parent?: HTMLElement): T
    {
        const existingElement: HTMLElement|null = document.querySelector(selector);

        if (existingElement)
        {
            return existingElement as T;
        }

        const newElement: T = document.createElement(elementTag) as T;

        if (parent && !existingElement)
        {
            parent.appendChild(newElement);
        }

        return newElement;
    }
}