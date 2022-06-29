import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor({popupSelector, containerSelector, imageSelector, textSelector}){
        super(popupSelector);
        this._imageContainer = document.querySelector(containerSelector);
        this._imageElement = document.querySelector(imageSelector);
        this._textElement = document.querySelector(textSelector)
    }

    open = (data) => {
        super.setEventListeners()
        this._imageElement.src = data.link;
        this._textElement.textContent = data.name;
        this._imageContainer.classList.add('overlay__element_opened');
        super.open();
    }

    close = () => {
        super.removeEventListeners()
        this._imageContainer.classList.remove('overlay__element_opened');
        super.close();
    }
}