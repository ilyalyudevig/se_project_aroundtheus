import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const pageElement = document.querySelector(".page");

const profileModal = document.querySelector(".page__profile-modal");
const placeModal = document.querySelector(".page__place-modal");
const imageModal = document.querySelector(".page__image-modal");

const closeButtons = document.querySelectorAll(".modal__close-button");

const modalImageElement = imageModal.querySelector(".modal__image");
const modalImageTitle = imageModal.querySelector(".modal__title");

const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");

const profileFormElement = document.forms["profile-form"];
const addPlaceFormElement = document.forms["place-form"];

const nameInput = profileFormElement.querySelector("[name='name']");
const jobInput = profileFormElement.querySelector("[name='job']");

const placeTitleInput = addPlaceFormElement.querySelector("[name='title']");
const imgURLInput = addPlaceFormElement.querySelector("[name='url']");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const placesList = document.querySelector(".places__list");

function renderCard(item, method = "prepend") {
  const card = new Card(item, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  placesList[method](cardElement);
}

function renderCards(cardsArray) {
  cardsArray.forEach((card) => renderCard(card));
}

function handleEscapeDown(evt) {
  if (evt.key === "Escape") {
    closeModal();
  }
}

function openModal(modal) {
  const validator = new FormValidator(formValidationSettings, modal);
  validator.validate();

  modal.classList.add("modal_opened");
  pageElement.addEventListener("keydown", handleEscapeDown);
}

function closeModal() {
  document.querySelector(".modal_opened").classList.remove("modal_opened");
  pageElement.removeEventListener("keydown", handleEscapeDown);
}

function addPlace() {
  openModal(placeModal);
}

function editProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(profileModal);
}

function resetValidation(form) {
  const validator = new FormValidator(formValidationSettings, form);
  validator.resetValidation();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal();
  resetValidation(evt.target);
}

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: placeTitleInput.value,
    link: imgURLInput.value,
  };

  renderCard(newCard);
  closeModal();
  resetValidation(evt.target);

  placeTitleInput.value = "";
  imgURLInput.value = "";
}

function handleImageClick(data) {
  modalImageElement.src = data.link;
  modalImageElement.alt = data.name;
  modalImageTitle.textContent = data.name;

  openModal(imageModal);
}

renderCards(initialCards);

editProfileButton.addEventListener("click", editProfile);
addPlaceButton.addEventListener("click", addPlace);

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addPlaceFormElement.addEventListener("submit", handleAddPlaceFormSubmit);

Array.from(document.querySelectorAll(".modal")).forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal();
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

Array.from(document.forms).forEach((form) => {
  const formValidator = new FormValidator(formValidationSettings, form);
  formValidator.enableValidation();
});
