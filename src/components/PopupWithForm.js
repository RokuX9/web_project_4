import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, popupElementSelector, inputSelector}, closePopupCallback){
        super(popupSelector);
        this._popupElement = document.querySelector(popupElementSelector)
        this._inputList = Array.from(this._popupElement.querySelectorAll(inputSelector));
        this._closePopupCallback = closePopupCallback;
        this._formElement = this._popupElement.querySelector(".form")
        this.formInputs = this._formElement.elements
    }

    getInputValues = () => {
        return this._inputList.reduce((previousValue, input) => {
            previousValue[input.name] = input.value;
            return previousValue
        }, {})
    }

    setInputs = (data) => {
        for (i=0; i<data.length; i++){
            this._inputList[i] = data[i]
        }
    }

    setEventListeners(){
        super.setEventListeners()
        this._popupElement.addEventListener('submit', this._closePopupCallback)
    }

    removeEventListeners(){
        super.removeEventListeners()
        this._popupElement.removeEventListener('submit', this._closePopupCallback)
    }

    open(){
        this._popupElement.classList.add('overlay__element_opened')
        this.setEventListeners()
        super.open()
    }

    close(){
        this._popupElement.classList.remove('overlay__element_opened')
        this._formElement.reset()
        this.removeEventListeners()
        super.close()
    }
}