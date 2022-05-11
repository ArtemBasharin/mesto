import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.show-image__img');
        this._imageCaption = this._popup.querySelector('.show-image__subscription');
    }

    showPopup(title, link) {
        this._popupImage.src = link;
        this._popupImage.alt = title;
        this._imageCaption.textContent = title;
        super.showPopup();
    }
}