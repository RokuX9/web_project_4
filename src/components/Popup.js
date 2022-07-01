export default class Popup {
    constructor(popupSelector, containerSelector){
        this._element = document.querySelector(popupSelector)
        this._containerElement = this._element.querySelector(containerSelector)
    }

    _handleEsqClose = (e) => {
        if (e.key === "Escape"){
            this.close();
        }
    }

    _handleClickClose = (e) => {
        if (e.target.classList.contains("overlay_opened") || e.target.classList.contains("overlay__button_type_close")){
            this.close();
        }
    }

    setEventListeners(){
        this._element.addEventListener('mousedown', this._handleClickClose);
        document.addEventListener('keydown', this._handleEsqClose);
    }

    _removeEventListeners(){
        this._element.removeEventListener('mousedown', this._handleClickClose);
        document.removeEventListener('keydown', this._handleEsqClose)
    }

    open(){
        this._element.classList.add('overlay_opened');
        this._containerElement.classList.add('overlay__element_opened');
    }

    close(){
        this._removeEventListeners()
        this._element.classList.remove('overlay_opened');
        this._containerElement.classList.remove('overlay__element_opened');
    }
}