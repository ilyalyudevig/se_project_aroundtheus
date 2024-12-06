const showError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const formError = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );

  inputElement.classList.add(inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(errorClass);
};

const hideError = (formElement, inputElement, inputErrorClass) => {
  const formError = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );

  inputElement.classList.remove(inputErrorClass);
  formError.textContent = "";
};

const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (!inputElement.validity.valid) {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideError(formElement, inputElement, inputErrorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  const inputList = formElement.querySelectorAll(inputSelector);
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((form) =>
    setEventListeners(
      form,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    )
  );
};

enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
});
