export class Card {
    constructor(data, cardTemplate, handleImageClick) {
        this._link = data.link;
        this._name = data.name;
        this._cardTemplate = cardTemplate;
        this._handleImageClick = handleImageClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardTemplate)
            .content.querySelector('.card')
            .cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._elemLike.addEventListener('click', () => {
            this._toggleLike();
        });
        this._elemTrash.addEventListener('click', () => {
            this._deleteCard();
        });
        this._elemImage.addEventListener("click", () => {
            this._handleImageClick(this._name, this._link);
        });
    }
    _toggleLike() {
        this._elemLike.classList.toggle('card__like-button_black');
    }

    _deleteCard() {
        this._element.remove()
    }

    renderCard() {
        this._element = this._getTemplate();
        this._elemImage = this._element.querySelector('.card__image');
        this._elemLike = this._element.querySelector('.card__like-button');
        this._elemTrash = this._element.querySelector('.card__trash-button');
        this._element
            .querySelector('.card__subsection')
            .querySelector('.card__description')
            .textContent = this._name;
        this._elemImage.src = this._link;
        this._elemImage.alt = this._name;
        this._setEventListeners();
        return this._element;
    }

}