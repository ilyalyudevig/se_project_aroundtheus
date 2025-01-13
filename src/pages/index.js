import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js";

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
  editAvatarModalSelector,
} = selectors;

const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const editAvatarElement = document.querySelector(".profile__avatar-container");

const formValidators = {};

const getCardElement = (item) => {
  const card = new Card(
    item,
    "#card-template",
    handleImageClick,
    openDeleteCardPopup,
    handleLikeClick
  );
  return card.generateCard();
};

const cardsList = new Section(
  {
    renderer: (item) => getCardElement(item),
  },
  cardsListSelector
);

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector,
  profileImageSelector: profileImageSelector,
});

api
  .getData()
  .then(({ userInfo: userData, cards }) => {
    const { name, about, avatar } = userData;
    userInfo.setUserInfo({
      name,
      job: about,
      avatarUrl: avatar,
    });
    cardsList.renderItems(cards.reverse());
  })
  .catch((err) => console.error("Error fetching user data and cards:", err));

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

const editAvatarPopup = new PopupWithForm(
  editAvatarModalSelector,
  handleEditAvatarSubmit
);
editAvatarPopup.setEventListeners();

const imagePopup = new PopupWithImage(imageModalSelector);
imagePopup.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation(
  deleteCardModalSelector,
  deleteCard
);
deleteCardPopup.setEventListeners();

function editProfile() {
  const { name, job } = userInfo.getUserInfo();
  profilePopup.setInputValues({ name, job });
  formValidators["profile-form"].resetValidation();
  profilePopup.open();
}

function addPlace() {
  formValidators["place-form"].toggleButtonState();
  addPlacePopup.open();
}

function editAvatar() {
  const { avatarUrl } = userInfo.getUserInfo();
  editAvatarPopup.setInputValues({ url: avatarUrl });
  editAvatarPopup.open();
}

function handleImageClick(data) {
  imagePopup.open(data);
}

function openDeleteCardPopup({ cardId }) {
  deleteCardPopup.setCardId(cardId);
  deleteCardPopup.open();
}

function handleSubmit(request, popupInstance, loadingText = "Saving...") {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close();
      popupInstance.getForm().reset();
    })
    .catch((err) => console.error("Error:", err))
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

function handleProfileFormSubmit({ name, job }) {
  function makeRequest() {
    return api.editUserInfo({ name, job }).then(({ name, about: job }) => {
      userInfo.setUserInfo({ name, job });
    });
  }

  handleSubmit(makeRequest, profilePopup);
}

function handleAddPlaceFormSubmit({ title, url }) {
  addPlacePopup.renderLoading(true);
  const newCard = { name: title, link: url };
  function makeRequest() {
    return api
      .addCard(newCard)
      .then((savedCard) => {
        cardsList.renderItems([savedCard]);
      })
      .then(() => formValidators["place-form"].toggleButtonState());
  }

  handleSubmit(makeRequest, addPlacePopup);
}

function handleEditAvatarSubmit({ url }) {
  editAvatarPopup.renderLoading(true);
  function makeRequest() {
    return api.editAvatarUrl({ url }).then(() => {
      userInfo.setAvatar({ avatarUrl: url });
    });
  }

  handleSubmit(makeRequest, editAvatarPopup);
}

function deleteCard(cardId) {
  api
    .deleteCard({ cardId })
    .then(() => {
      document.querySelector(`#${cardId}`).remove();
      deleteCardPopup.close();
    })
    .catch((err) => console.error("Error deleting the card:", err))
    .finally(() => {
      formValidators["confirm-card-delete-form"].resetValidation();
    });
}

function handleLikeClick({ cardId, method }) {
  api
    .likeCard({ cardId, method })
    .catch((err) => console.error("Error during like click:", err));
}

function enableValidation(settings) {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    validator.enableValidation();
    formValidators[formElement.getAttribute("name")] = validator;
  });
}

editProfileButton.addEventListener("click", editProfile);
addPlaceButton.addEventListener("click", addPlace);
editAvatarElement.addEventListener("click", editAvatar);

enableValidation(formValidationSettings);
