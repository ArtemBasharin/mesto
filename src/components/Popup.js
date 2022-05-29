export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close');
        this._handleEscButton = this._handleEscButton.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }

    showPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscButton);
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscButton);
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
        this._popup.addEventListener('mousedown', this._handleOverlayClose);
        this._closeButton.addEventListener('click', this._handleButtonClose);
    }
}