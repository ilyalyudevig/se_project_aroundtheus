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

const profileModal = document.querySelector(".page__profile-modal");
const placeModal = document.querySelector(".page__place-modal");

const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");

const closeEditProfileFormButton = profileModal.querySelector(
  ".modal__close-button"
);
const closeAddPlaceFormButton = placeModal.querySelector(
  ".modal__close-button"
);

const editProfileFormSaveButton = document.querySelector(".form__save-button");
const profileFormElement = document.forms["profile-form"];
const nameInput = profileFormElement.querySelector("[name='name']");
const jobInput = profileFormElement.querySelector("[name='job']");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const placesList = document.querySelector(".places__list");

function addPlace() {
  placeModal.classList.add("modal_opened");
}

function editProfile() {
  profileModal.classList.add("modal_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closeForm(e) {
  e.target.closest(".modal").classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeEditProfileForm();
}

function getCardElement(data) {
  const cardElement = placesList
    .querySelector("#card-template")
    .content.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = data.name;
  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);

  return cardElement;
}

initialCards.forEach((card) => placesList.append(getCardElement(card)));

editProfileButton.addEventListener("click", editProfile);
closeEditProfileFormButton.addEventListener("click", closeForm);
closeAddPlaceFormButton.addEventListener("click", closeForm);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

addPlaceButton.addEventListener("click", addPlace);
