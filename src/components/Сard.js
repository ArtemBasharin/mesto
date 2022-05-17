export default class Card {
    constructor({ data, handleCardClick }, cardSelector) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector)
            .content.querySelector('.card').cloneNode(true);
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
            this._handleCardClick(this._name, this._link);
        });
    }

    _toggleLike() {
        this._elemLike.classList.toggle('card__like-button_black');
    }

    _deleteCard() {
        this._element.remove()
    }

    generateCard() {
        this._element = this._getTemplate();
        this._elemImage = this._element.querySelector('.card__image');
        this._elemLike = this._element.querySelector('.card__like-button');
        this._elemTrash = this._element.querySelector('.card__trash-button');
        this._element.querySelector('.card__description').textContent = this._name;
        this._elemImage.src = this._link;
        this._elemImage.alt = this._name;
        this._setEventListeners();
        return this._element;
    }
}