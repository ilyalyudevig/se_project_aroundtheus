import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";

import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { DeleteCardPopup } from "../components/DeleteCardPopup.js";

import { UserInfo } from "../components/UserInfo.js";

import Api from "../components/Api.js";
import { token } from "../utils/constants.js";

import "./index.css";

import { selectors, formValidationSettings } from "../utils/constants.js";

const {
  profileModalSelector,
  placeModalSelector,
  imageModalSelector,
  profileNameSelector,
  profileJobSelector,
  profileImageSelector,
  cardsListSelector,
  deleteCardModalSelector,
} = selectors;

const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: token,
  },
});

const getCardElement = (item) => {
  const card = new Card(
    item,
    "#card-template",
    handleImageClick,
    openDeleteCardPopup
  );
  const cardElement = card.generateCard();
  return cardElement;
};

const cardsList = new Section(
  {
    renderer: (item) => {
      const cardElement = getCardElement(item);
      cardsList.addItem(cardElement, { method: "prepend" });
    },
  },
  cardsListSelector
);

api.getInitialCards().then((cards) => {
  cardsList.renderItems(cards.reverse());
});

const profilePopup = new PopupWithForm(
  profileModalSelector,
  handleProfileFormSubmit
);

profilePopup.setEventListeners();
const profileFormElement = profilePopup.getForm();

const nameInput = profileFormElement.querySelector("[name='name']");
const jobInput = profileFormElement.querySelector("[name='job']");

const addPlacePopup = new PopupWithForm(
  placeModalSelector,
  handleAddPlaceFormSubmit
);

addPlacePopup.setEventListeners();

function addPlace() {
  formValidators["place-form"].resetValidation();
  addPlacePopup.open();
}

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector,
  imageSelector: profileImageSelector,
});

api.getUserInfo().then((res) => {
  userInfo.setUserInfo({ name: res.name, job: res.about });
});

function editProfile() {
  const profileInfo = userInfo.getUserInfo();
  const { name, job } = profileInfo;
  nameInput.value = name;
  jobInput.value = job;
  profilePopup.open();
}

function handleProfileFormSubmit({ name, job }) {
  api.editUserInfo({ name, job });
  userInfo.setUserInfo({ name, job });
  profilePopup.close();
  formValidators["profile-form"].resetValidation();
}

function handleAddPlaceFormSubmit({ title, url }) {
  const newCard = { name: title, link: url };

  api.addCard(newCard);
  cardsList.renderItems([newCard]);
  addPlacePopup.close();
  formValidators["place-form"].toggleButtonState();
}

const imagePopup = new PopupWithImage(imageModalSelector);
imagePopup.setEventListeners();

function handleImageClick(data) {
  imagePopup.open(data);
}

const deleteCardPopup = new DeleteCardPopup(
  deleteCardModalSelector,
  deleteCard
);
deleteCardPopup.setEventListeners();

function openDeleteCardPopup({ cardId }) {
  deleteCardPopup.setCardId(cardId);
  deleteCardPopup.open();
}

function deleteCard(cardId) {
  document.querySelector(`#${cardId}`).remove();
  api.deleteCard({ cardId });
}

editProfileButton.addEventListener("click", editProfile);
addPlaceButton.addEventListener("click", addPlace);

const formValidators = {};

const enableValidation = (settings) => {
  const formList = Array.from(document.forms);

  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    validator.enableValidation();

    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
  });
};

enableValidation(formValidationSettings);
