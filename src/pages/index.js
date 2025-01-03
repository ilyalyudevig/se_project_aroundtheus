import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";

import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

import { UserInfo } from "../components/UserInfo.js";

import Api from "../components/Api.js";
import { token } from "../utils/constants.js";

import "./index.css";

import {
  initialCards,
  selectors,
  formValidationSettings,
} from "../utils/constants.js";

const {
  profileModalSelector,
  placeModalSelector,
  imageModalSelector,
  profileNameSelector,
  profileJobSelector,
  cardsListSelector,
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
  const card = new Card(item, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  return cardElement;
};

api.getInitialCards().then((cards) => {
  const cardsList = new Section(
    {
      items: cards,
      renderer: (item) => {
        const cardElement = getCardElement(item);
        cardsList.addItem(cardElement, { method: "prepend" });
      },
    },
    cardsListSelector
  );

  cardsList.renderItems();
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
});

function editProfile() {
  const profileInfo = userInfo.getUserInfo();
  const { name, job } = profileInfo;
  nameInput.value = name;
  jobInput.value = job;
  profilePopup.open();
}

function handleProfileFormSubmit({ name, job }) {
  userInfo.setUserInfo({ name, job });
  profilePopup.close();
  formValidators["profile-form"].resetValidation();
}

function handleAddPlaceFormSubmit({ title, url }) {
  const newCard = { name: title, link: url };
  const cardElement = getCardElement(newCard);

  cardsList.addItem(cardElement, { method: "prepend" });

  addPlacePopup.close();

  formValidators["place-form"].toggleButtonState();
}

const imagePopup = new PopupWithImage(imageModalSelector);
imagePopup.setEventListeners();

function handleImageClick(data) {
  imagePopup.open(data);
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
