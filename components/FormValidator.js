export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showError() {
    this._inputElement.classList.add(this._settings.inputErrorClass);
    this._formError.textContent = this._inputElement.validationMessage;
    this._formError.classList.add(this._settings.errorClass);
  }

  _hideError() {
    this._inputElement.classList.remove(this._settings.inputErrorClass);
    this._formError.textContent = "";
  }

  _checkInputValidity(inputElement) {
    this._inputElement = inputElement;
    this._formError = this._formElement.querySelector(
      `.${inputElement.name}-input-error`
    );
    if (!inputElement.validity.valid) {
      this._showError();
    } else {
      this._hideError();
    }
  }

  _hasInvalidInput() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    this._buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );

    this._allInputsAreValid = !this._hasInvalidInput();

    this._allInputsAreValid
      ? this._buttonElement.classList.add(this._settings.inactiveButtonClass)
      : this._buttonElement.classList.remove(
          this._settings.inactiveButtonClass
        );
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
      });
      this._toggleButtonState();
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
