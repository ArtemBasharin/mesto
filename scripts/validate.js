const conf = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_type_error-active'
};

const showInputError = (formElement, inputElement, errorMessage, conf) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(conf.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(conf.errorClass);
};

const hideInputError = (formElement, inputElement, conf) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(conf.inputErrorClass);
    errorElement.classList.remove(conf.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, conf) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, conf);
    } else {
        hideInputError(formElement, inputElement, conf);
    }
};

const setEventListeners = (formElement, conf) => {
    const inputList = Array.from(formElement.querySelectorAll(conf.inputSelector));
    const buttonElement = formElement.querySelector(conf.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, conf);
            toggleButtonState(inputList, buttonElement, conf);
        });
    });
};

const enableValidation = (conf) => {
    const formList = Array.from(document.querySelectorAll(conf.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, conf);
    });
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function toggleButtonState(inputList, buttonElement, conf) {
    if (hasInvalidInput(inputList, conf)) {
        buttonElement.classList.add(conf.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(conf.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

enableValidation(conf);