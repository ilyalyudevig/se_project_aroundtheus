import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";

import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

import { UserInfo } from "../components/UserInfo.js";

import "./index.css";

import { initialCards } from "../utils/constants.js";
import { selectors } from "../utils/constants.js";

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

const profileFormElement = document.forms["profile-form"];
const addPlaceFormElement = document.forms["place-form"];

const nameInput = profileFormElement.querySelector("[name='name']");
const jobInput = profileFormElement.querySelector("[name='job']");

const placeTitleInput = addPlaceFormElement.querySelector("[name='title']");
const imgURLInput = addPlaceFormElement.querySelector("[name='url']");

const getCard = (item) => {
  return new Card(item, "#card-template", handleImageClick);
};

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = getCard(item);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement, { method: "prepend" });
    },
  },
  cardsListSelector
);

cardsList.renderItems();

const profilePopup = new PopupWithForm(
  profileModalSelector,
  handleProfileFormSubmit
);

profilePopup.setEventListeners();

const addPlacePopup = new PopupWithForm(
  placeModalSelector,
  handleAddPlaceFormSubmit
);

addPlacePopup.setEventListeners();

function addPlace() {
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

function handleProfileFormSubmit() {
  userInfo.setUserInfo({ name: nameInput.value, job: jobInput.value });
  profilePopup.close();
  formValidators["profile-form"].resetValidation();
}

function handleAddPlaceFormSubmit() {
  const newCard = {
    name: placeTitleInput.value,
    link: imgURLInput.value,
  };

  const card = getCard(newCard);
  const cardElement = card.generateCard();

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

Array.from(document.querySelectorAll(".modal")).forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      modal.classList.remove("modal_opened");
    }
  });
});

const formValidationSettings = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

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
