export default class Card {
    constructor({ data, userId, clickHandlers }, cardSelector) {
        this._title = data.name;
        this._link = data.link;
        this._ownerId = data.owner._id;
        this._likes = data.likes;
        this._cardId = data._id;
        this._cardSelector = cardSelector;
        this._userId = userId;
        this._handleCardClick = clickHandlers.handleCardClick;
        this._handleLikeClick = clickHandlers.handleLikeClick;
        this._handleDeleteIconClick = clickHandlers.handleDeleteClick;
    }


    /////////////
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector)
            .content.querySelector('.card')
            .cloneNode(true);
        return cardElement;
    }


    /////////////
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


    //////////
    _toggleLike() {
        this._handleLikeClick(this._cardId, this.isLiked)
            .then((data) => {
                this._elemLike.classList.toggle('card__like-button_black');
                this.isLiked = !this.isLiked;
                this._likesCounter.textContent = data.likes.length;
            })
            .catch((err) => {
                console.log(err); //////////////вывести ошибку!!!!
            });
    }

    /////////////
    markUserLikes(card) { ///////////пока параметр не нужен
        if (this._likes.some(person => person._id === this._userId)) {
            this._buttonLike.classList.add('button_type_like_active');
        }
    }

    ///////////
    updateLikes(card) {
        this._likesCounter.textContent = this._likes.length;
    }



    //////////
    deleteCard() {
        this._element.remove();
        this._element = null;
    }


    /////////////////
    _allowDeletion() {
        if (this._userId !== this._ownerId) {
            this._elemTrash.classList.add('button_type_delete_hidden')
        } else {
            this._elemTrash.classList.remove('button_type_delete_hidden')
        }
    }


    //////////////
    generateCard() {
        this._element = this._getTemplate();
        this._elemImage = this._element.querySelector('.card__image');
        this._elemLike = this._element.querySelector('.card__like-button');
        this._elemTrash = this._element.querySelector('.card__trash-button');
        this._likesCounter = this._element.querySelector('.place__likesCounter');
        this._element.querySelector('.card__description').textContent = this._name;
        this._elemImage.src = this._link;
        this._elemImage.alt = this._name;
        this._allowDeletion();
        this._setEventListeners();
        return this._element;
    }
}