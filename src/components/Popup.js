import { selectors } from "../utils/constants.js";

const { pageSelector, closeModalButtonSelector } = selectors;

export default class Popup {
  constructor({ selector }) {
    this._popup = document.querySelector(selector);
    this._page = document.querySelector(pageSelector);
  }

  open() {
    this._popup.classList.add("modal_opened");
    this._page.addEventListener("keydown", this._handleEscClose);
    this._page.addEventListener("click", this._handleOverlayClick);
  }

  close() {
    this._popup.classList.remove("modal_opened");
    this._page.removeEventListener("keydown", this._handleEscClose);
    this._page.removeEventListener("click", this._handleOverlayClick);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOverlayClick = (evt) => {
    if (evt.target === this._popup) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton = this._popup.querySelector(closeModalButtonSelector);
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
