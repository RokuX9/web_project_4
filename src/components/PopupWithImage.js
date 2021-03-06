import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor({popupSelector, containerSelector, imageSelector, textSelector}){
        super(popupSelector, containerSelector);
        this._imageElement = document.querySelector(imageSelector);
        this._textElement = document.querySelector(textSelector)
    }

    open = (data) => {
        this._imageElement.src = data.link;
        this._imageElement.alt = `${data.name} picture`
        this._textElement.textContent = data.name;
        super.open();
    }
}