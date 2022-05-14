export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close');
        this._handleEscButton = this._handleEscButton.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }

    showPopup() {
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');
        this._removeEventListeners();
    }

    _handleEscButton = (evt) => {
        if (evt.key === 'Escape') {
            this.closePopup();
        }
    }

    _handleOverlayClose = (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            this.closePopup();
        }
    }

    _handleButtonClose = () => {
        this.closePopup();
    }

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscButton);
        this._popup.addEventListener('mousedown', this._handleOverlayClose);
        this._closeButton.addEventListener('click', this._handleButtonClose);
    }

    _removeEventListeners() {
        document.removeEventListener('keydown', this._handleEscButton);
        this._popup.removeEventListener('mousedown', this._handleOverlayClose);
        this._closeButton.removeEventListener('click', this._handleButtonClose);
    }
}