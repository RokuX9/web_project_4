import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, popupElementSelector, inputSelector}, closePopupCallback){
        super(popupSelector, popupElementSelector);
        this._inputList = Array.from(this._containerElement.querySelectorAll(inputSelector));
        this._formElement = this._containerElement.querySelector(".form")
        this._closePopupCallback = closePopupCallback;
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
        this._formElement.addEventListener('submit', this._closePopupCallback)
    }

    _removeEventListeners(){
        this._formElement.removeEventListener('submit', this._closePopupCallback)
        super._removeEventListeners()
    }

    open(){
        super.open()
    }

    close(){
        this._formElement.reset()
        this._removeEventListeners()
        super.close()
    }
}