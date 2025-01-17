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

const selectors = {
  pageSelector: ".page",
  profileModalSelector: ".page__profile-modal",
  placeModalSelector: ".page__place-modal",
  imageModalSelector: ".page__image-modal",
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__job",
  profileImageSelector: ".profile__avatar",
  cardsListSelector: ".places__list",
  closeModalButtonSelector: ".modal__close-button",
  modalImageSelector: ".modal__image",
  modalImageTitleSelector: ".modal__title",
  deleteCardModalSelector: ".page__delete-card-modal",
  editAvatarModalSelector: ".page__edit-avatar-modal",
};

const formValidationSettings = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const token = "19c5994b-226e-4f78-a8d2-c207c10029fd";

export { initialCards, selectors, formValidationSettings, token };
