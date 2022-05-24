import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form'); //в будущем сделать связку с параметром conf
        this._inputList = this._form.querySelectorAll('.popup__input'); //в будущем сделать связку с параметром conf
    }

    _getInputValues = () => {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    _submitForm = (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.closePopup();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitForm);
    }



    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}