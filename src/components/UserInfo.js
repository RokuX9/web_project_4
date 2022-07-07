export default class UserInfo {
    constructor( {nameSelector, aboutSelector, imageSelector} ){
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._imageElement = document.querySelector(imageSelector)
        this.id = null
    }
    

    getUserInfo = () => {
        return {name: this._nameElement.textContent, about: this._aboutElement.textContent, id: this.id}
    }
    
    setUserImage = (url) => {
        this._imageElement.style.backgroundImage = `url(${url})`
    }
    
    setUserInfo = ({name, about, avatar, _id}) => {
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
        this.setUserImage(avatar)
        this.id = _id
    }

}