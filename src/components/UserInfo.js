export default class UserInfo {
    constructor(name, employment, avatar) {
        this._name = document.querySelector(name);
        this._employment = document.querySelector(employment);
        this._avatar = avatar;
    };


    getUserInfo() {
        const currentUserInfo = {};
        currentUserInfo.name = this._name.textContent;
        currentUserInfo.employment = this._employment.textContent;
        currentUserInfo.avatar = this._avatar.src;

        return currentUserInfo;
    };


    setUserInfo(data) {
        this._name.textContent = data.name;
        this._employment.textContent = data.about;
        this._avatar.src = data.avatar;
        console.log(this._employment.textContent);
    };
}