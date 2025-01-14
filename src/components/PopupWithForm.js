import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super({ selector });
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll(".form__input");
    this._form = this._popup.querySelector(".form");
    this._submitBtn = this._form.querySelector("[type='submit']");
    this._submitBtnText = this._submitBtn.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  getForm() {
    return this._form;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
