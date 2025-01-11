export class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    openDeleteCardPopup,
    handleLikeClick
  ) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._openDeleteCardPopup = openDeleteCardPopup;

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
    const { name, link, _id, isLiked } = this._data;
    this._cardItem.id = `card_${_id}`;
    this._cardImageElement.src = link;
    this._cardImageElement.alt = name;
    this._cardImageElement.name = name;
    this._title.textContent = name;
    this._cardItem.isLiked = isLiked;
  }

  _handleLikeButton(evt) {
    evt.preventDefault();
    evt.target.classList.toggle(this._selectors.likeButtonActive);
    this._handleLikeClick({
      cardId: this._cardItem.id,
      method: this._cardItem.isLiked ? "DELETE" : "PUT",
    });
    this._cardItem.isLiked = !this._cardItem.isLiked;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", (evt) =>
      this._handleLikeButton(evt)
    );

    this._deleteButton.addEventListener("click", () => {
      this._openDeleteCardPopup({ cardId: this._cardItem.id });
    });

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
    this._cardItem = this._cardElement.querySelector(this._selectors.cardItem);

    this._setCardContent();
    this._setEventListeners();

    if (this._data.isLiked) {
      this._likeButton.classList.toggle(this._selectors.likeButtonActive);
    }
    return this._cardElement;
  }
}
