export class Popup {
    constructor(popupSelector) {
        this._popupselector = document.querySelectorAll(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close');
        this._handleEscButton = this._handleEscButton.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }

    showPopup() {
        this._popupselector.classList.add('popup_opened');
        this._setEventListeners();
    }

    closePopup() {
        this._popupselector.classList.remove('popup_opened');
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

    _setEventListeners() {
        document.addEventListener('keydown', this._handleEscButton);
        this._popupselector.addEventListener('mousedown', this._handleOverlayClose);
        this._closeButton.addEventListener('click', this._handleButtonClose);
    }

    _removeEventListeners() {
        document.removeEventListener('keydown', this._handleEscButton);
        this._popupselector.removeEventListener('mousedown', this._handleOverlayClose);
        this._closeButton.removeEventListener('click', this._handleButtonClose);
    }
}