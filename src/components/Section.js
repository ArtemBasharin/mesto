export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach(element => {
            this._renderer(element)
        });
    }

    addItem(element) {
        this._container.append(element)
    }
}