export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
                method: "GET",
                headers: this._headers,
            })
            .then(this._checkResponse);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
                method: "GET",
                headers: this._headers,
            })
            .then(this._checkResponse);
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    employment: data.employment
                })
            })
            .then(this._checkResponse);
    }

    setAvatar(avatarLink) {
        return fetch(`${this._url}/users/me/avatar`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    avatar: avatarLink
                })
            })
            .then(this._checkResponse);
    }

    postNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(this._checkResponse);
    }

    likeCard(cardId, isLiked) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: isLiked ? "DELETE" : "PUT",
                headers: this._headers,
            })
            .then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
                method: "DELETE",
                headers: this._headers,
            })
            .then(this._checkResponse);
    }
}