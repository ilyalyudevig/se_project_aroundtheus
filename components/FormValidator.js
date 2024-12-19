export class FormValidator {
  constructor(settings, formElement) {
    const {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    } = settings;

    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._formElement = formElement;

    this._buttonElement = this._formElement.querySelector(submitButtonSelector);
    this._inputList = Array.from(formElement.querySelectorAll(inputSelector));
  }

  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`.${inputElement.name}-input-error`);
  }

  _showError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
    this._toggleButtonState();
  }

  _hideError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    this._toggleButtonState();
  }

  _checkInputValidity(inputElement) {
    inputElement.validity.valid
      ? this._hideError(inputElement)
      : this._showError(inputElement);
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _toggleButtonState() {
    const isInvalid = this._hasInvalidInput();
    this._buttonElement.classList.toggle(this._inactiveButtonClass, isInvalid);
    this._buttonElement.disabled = isInvalid;
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => this._checkInputValidity(input));
    });
    this._toggleButtonState();
  }

  validate() {
    this._inputList.forEach((input) => this._checkInputValidity(input));
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((input) => {
      this._getErrorElement(input).textContent = "";
    });
    this._buttonElement.disabled = true;
  }
}
