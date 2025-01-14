export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItems(items) {
    this._items = items;
  }

  renderItems(items) {
    items.forEach((item) => {
      const cardElement = this._renderer(item);
      this.addItem(cardElement, { method: "prepend" });
    });
  }

  addItem(element, { method }) {
    this._container[method](element);
  }
}
