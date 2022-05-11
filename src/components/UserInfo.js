export class UserInfo {
    constructor(name, employment) {
        this._name = name;
        this._employment = employment;
    }

    getUserInfo() {
        this._data = {
            name: this._name.textContent,
            employment: this._employment.textContent
        }

        return this._data;
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._employment.textContent = data.employment;
    }
}