import { selectors } from "../utils/constants.js";

import Popup from "./Popup.js";

const { modalImageSelector, modalImageTitleSelector } = selectors;

export class PopupWithImage extends Popup {
  constructor(selector) {
    super({ selector });
  }

  open({ name, link }) {
    this._imageElement = this._popup.querySelector(modalImageSelector);
    this._imageTitle = this._popup.querySelector(modalImageTitleSelector);
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._imageTitle.textContent = name;
    super.open();
  }
}
