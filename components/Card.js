export class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;

    this._selectors = {
      image: ".card__image",
      title: ".card__title",
      likeButton: ".card__like-button",
      likeButtonActive: "card__like-button_checked",
      deleteButton: ".card__trash",
      cardItem: ".card",
    };
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.cloneNode(true);
  }

  _setCardContent() {
    const { name, link } = this._data;

    this._cardImageElement.src = link;
    this._cardImageElement.alt = name;
    this._cardImageElement.name = name;
    this._title.textContent = name;
  }

  _handleLikeButton(evt) {
    evt.preventDefault();
    evt.target.classList.toggle(this._selectors.likeButtonActive);
  }

  _handleDeleteButton(evt) {
    evt.preventDefault();
    evt.target.closest(this._selectors.cardItem).remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", (evt) =>
      this._handleLikeButton(evt)
    );

    this._deleteButton.addEventListener("click", (evt) =>
      this._handleDeleteButton(evt)
    );

    this._cardImageElement.addEventListener("click", () =>
      this._handleImageClick(this._data)
    );
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._title = this._cardElement.querySelector(this._selectors.title);
    this._cardImageElement = this._cardElement.querySelector(
      this._selectors.image
    );
    this._likeButton = this._cardElement.querySelector(
      this._selectors.likeButton
    );
    this._deleteButton = this._cardElement.querySelector(
      this._selectors.deleteButton
    );

    this._setCardContent();
    this._setEventListeners();

    return this._cardElement;
  }
}
