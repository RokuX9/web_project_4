export default class Popup {
    constructor(popupSelector){
        this._element = document.querySelector(popupSelector)
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

    removeEventListeners(){
        this._element.removeEventListener('mousedown', this._handleClickClose);
        document.removeEventListener('keydown', this._handleEsqClose)
    }

    open(){
        this._element.classList.add('overlay_opened');
    }

    close(){
        this._element.classList.remove('overlay_opened');
    }
}