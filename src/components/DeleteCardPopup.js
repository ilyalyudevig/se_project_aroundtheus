import { Popup } from "../components/Popup.js";

export class DeleteCardPopup extends Popup {
  constructor(selector, deleteCard) {
    super({ selector });
    this._confirmButton = this._popup.querySelector(".form__save-button");
    this._deleteCard = deleteCard;
  }

  setEventListeners() {
    this._confirmButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._deleteCard(this._cardId);
      this.close();
    });
    super.setEventListeners();
  }

  setCardId(cardId) {
    this._cardId = cardId;
  }
}
