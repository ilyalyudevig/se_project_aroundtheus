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
  }

  close() {
    this._popup.classList.remove("modal_opened");
    this._page.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      document.querySelector(".modal_opened").classList.remove("modal_opened");
    }
  }

  setEventListeners() {
    this._closeButton = this._popup.querySelector(closeModalButtonSelector);
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
