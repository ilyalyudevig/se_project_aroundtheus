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
const imageModal = document.querySelector(".modal-image");

const modalImageElement = document.querySelector(".modal-image__image");
const modalImageTitle = document.querySelector(".modal-image__title");

const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");

const closeEditProfileFormButton = profileModal.querySelector(
  ".modal__close-button"
);
const closeAddPlaceFormButton = placeModal.querySelector(
  ".modal__close-button"
);
const closeImageModalButton = imageModal.querySelector(
  ".modal-image__close-button"
);

const profileFormElement = document.forms["profile-form"];
const addPlaceFormElement = document.forms["place-form"];

const editProfileFormSaveButton =
  profileFormElement.querySelector(".form__save-button");
const addPlaceFormSaveButton =
  addPlaceFormElement.querySelector(".form__save-button");

const nameInput = profileFormElement.querySelector("[name='name']");
const jobInput = profileFormElement.querySelector("[name='job']");

const placeTitleInput = addPlaceFormElement.querySelector("[name='title']");
const imgURLInput = addPlaceFormElement.querySelector("[name='url']");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const placesList = document.querySelector(".places__list");

function renderCards(cardsArray) {
  cardsArray.forEach((card) => placesList.append(getCardElement(card)));
}

function addPlace() {
  placeModal.classList.add("modal_opened");
}

function editProfile() {
  profileModal.classList.add("modal_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closeForm(evt) {
  evt.target.closest(".modal").classList.remove("modal_opened");
}

function closeModalImage(evt) {
  evt.target.closest(".modal-image").classList.remove("modal-image_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeForm(evt);
}

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();

  const newCard = getCardElement({
    name: placeTitleInput.value,
    link: imgURLInput.value,
  });

  placesList.prepend(newCard);
  closeForm(evt);
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

  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash");

  likeButton.addEventListener("click", handleLikeClick);
  trashButton.addEventListener("click", handleTrashClick);
  cardImage.addEventListener("click", handleImageClick);

  return cardElement;
}

function handleLikeClick(evt) {
  evt.preventDefault();
  evt.target.classList.toggle("card__like-button_checked");
}

function handleTrashClick(evt) {
  evt.preventDefault();
  evt.target.parentElement.remove();
}

function handleImageClick(evt) {
  evt.preventDefault();
  imageModal.classList.add("modal-image_opened");
  modalImageElement.src = evt.target.src;
  modalImageTitle.textContent = evt.target.alt;
}

renderCards(initialCards);

editProfileButton.addEventListener("click", editProfile);
addPlaceButton.addEventListener("click", addPlace);

closeEditProfileFormButton.addEventListener("click", closeForm);
closeAddPlaceFormButton.addEventListener("click", closeForm);
closeImageModalButton.addEventListener("click", closeModalImage);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addPlaceFormElement.addEventListener("submit", handleAddPlaceFormSubmit);
