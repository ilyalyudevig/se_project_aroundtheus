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
const editAvatarForm = editAvatarPopup.getForm();
const avatarUrlInput = editAvatarForm.querySelector("[name='url']");

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

function handleProfileFormSubmit({ name, job }) {
  profilePopup.renderLoading(true);
  api
    .editUserInfo({ name, job })
    .then(() => {
      userInfo.setUserInfo({ name, job });
      profilePopup.close();
      profilePopup.getForm().reset();
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    })
    .finally(() => {
      profilePopup.renderLoading(false);
    });
}

function addPlace() {
  formValidators["place-form"].toggleButtonState();
  addPlacePopup.open();
}

function handleAddPlaceFormSubmit({ title, url }) {
  addPlacePopup.renderLoading(true);
  const newCard = { name: title, link: url };
  api
    .addCard(newCard)
    .then((savedCard) => {
      cardsList.renderItems([savedCard]);
      addPlacePopup.close();
      addPlacePopup.getForm().reset();
      formValidators["place-form"].toggleButtonState();
    })
    .catch((err) => {
      console.error("Error adding place:", err);
    })
    .finally(() => {
      addPlacePopup.renderLoading(false);
    });
}

function editAvatar() {
  const { avatarUrl } = userInfo.getUserInfo();
  editAvatarPopup.setInputValues({ avatarUrl });
  editAvatarPopup.open();
}

function handleEditAvatarSubmit({ url }) {
  editAvatarPopup.renderLoading(true);
  api
    .editAvatarUrl({ url })
    .then(() => {
      userInfo.setAvatar({ avatarUrl: url });
      editAvatarPopup.close();
      editAvatarPopup.getForm().reset();
    })
    .catch((err) => {
      console.error("Error updating avatar:", err);
    })
    .finally(() => {
      editAvatarPopup.renderLoading(false);
    });
}

function handleImageClick(data) {
  imagePopup.open(data);
}

function openDeleteCardPopup({ cardId }) {
  deleteCardPopup.setCardId(cardId);
  deleteCardPopup.open();
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
