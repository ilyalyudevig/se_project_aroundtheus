export class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    this._cardImageElement = this._cardElement.querySelector(".card__image");

    this._cardElement.querySelector(".card__title").textContent =
      this._data.name;
    this._cardImageElement.src = this._data.link;
    this._cardImageElement.alt = this._data.name;
    this._cardImageElement.name = this._data.name;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._likeButtonElement =
      this._cardElement.querySelector(".card__like-button");

    this._likeButtonElement.addEventListener("click", (evt) => {
      evt.preventDefault();
      evt.target.classList.toggle("card__like-button_checked");
    });

    this._trashButtonElement = this._cardElement.querySelector(".card__trash");

    this._trashButtonElement.addEventListener("click", (evt) => {
      evt.preventDefault();
      evt.target.closest(".card").remove();
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }
}
