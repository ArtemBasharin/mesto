import Popup from '../components/Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor({ popupSelector, handleTrashButtonClick }) {
        super(popupSelector);
        this._handleTrashButtonClick = handleTrashButtonClick;
        this._deleteCardButton = this._popup.querySelector('.popupConfirm');
    }

    _setEventListeners() {
        super._setEventListeners();
        this._deleteCardButton.addEventListener('click', this._confirmDelete);
    }

    _confirmDelete = () => {
        this._handleTrashButtonClick();
    }

    showPopup() {
        this._setEventListeners();
        super.showPopup();
    }

}