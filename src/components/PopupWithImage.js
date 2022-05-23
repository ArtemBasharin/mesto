import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.show-image__img');
        this._imageSubscription = this._popup.querySelector('.show-image__subscription');
    }

    showPopup(link, title) {
        this._popupImage.src = link;
        this._popupImage.alt = title;
        this._imageSubscription.textContent = title;
        super.showPopup();
    }
}