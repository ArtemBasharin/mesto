export class Card {
    constructor(data, cardTemplate) {
        this._link = data.link;
        this._name = data.name;
        this._cardTemplate = cardTemplate;

    }
    _getTemplate() {
        const cardElem = document
            .querySelector('.horizontal-card')
            .content
            .querySelector('.card')
            .cloneNode(true);
        return cardElem;
    }
}