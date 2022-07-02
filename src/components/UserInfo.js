export default class UserInfo {
    constructor( {nameSelector, aboutSelector} ){
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this.id = null
    }
    

    getUserInfo = () => {
        return {name: this._nameElement.textContent, about: this._aboutElement.textContent, id: this.id}
    }

    setUserInfo = ({name, about, _id}) => {
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
        this.id = _id
    }
}