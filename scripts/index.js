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
const imageModal = document.querySelector(".page__image-modal");

const closeButtons = document.querySelectorAll(".modal__close-button");

const modalImageElement = imageModal.querySelector(".modal__image");
const modalImageTitle = imageModal.querySelector(".modal__title");

const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");

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

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  placesList[method](cardElement);
}

function renderCards(cardsArray) {
  cardsArray.forEach((card) => renderCard(card));
}

function handleEscapeDown(evt) {
  if (evt.key === "Escape") {
    closeModal(evt.currentTarget);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("keydown", handleEscapeDown);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("keydown", handleEscapeDown);
}

function addPlace() {
  openModal(placeModal);
}

function editProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(profileModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(profileModal);
}

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: placeTitleInput.value,
    link: imgURLInput.value,
  };

  renderCard(newCard);
  closeModal(placeModal);
  placeTitleInput.value = "";
  imgURLInput.value = "";
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
  cardImage.setAttribute("name", data.name);

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

  modalImageElement.src = evt.target.src;
  modalImageElement.alt = evt.target.name;
  modalImageTitle.textContent = evt.target.name;

  const modalImageContainer = imageModal.querySelector(".modal__container");
  modalImageContainer.classList.add("modal__container_preview");

  const closeModalImageButtonContainer = modalImageContainer.querySelector(
    ".modal__close-button-container"
  );
  closeModalImageButtonContainer.classList.add(
    "modal__close-button-container_preview"
  );

  const closeModalImageButton = modalImageContainer.querySelector(
    ".modal__close-button"
  );
  closeModalImageButton.classList.add("modal__close-button_preview");

  modalImageElement.classList.add("modal__image_preview");
  modalImageTitle.classList.add("modal__title_preview");

  openModal(imageModal);
}

renderCards(initialCards);

editProfileButton.addEventListener("click", editProfile);
addPlaceButton.addEventListener("click", addPlace);

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addPlaceFormElement.addEventListener("submit", handleAddPlaceFormSubmit);

Array.from(document.querySelectorAll(".modal")).forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});
