import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, popupElementSelector, inputSelector, buttonSelector}, closePopupCallback){
        super(popupSelector, popupElementSelector);
        this._inputList = Array.from(this._containerElement.querySelectorAll(inputSelector));
        this._formElement = this._containerElement.querySelector(".form")
        this._closePopupCallback = closePopupCallback;
        this.formInputs = this._formElement.elements;
        this._buttonElement = this._formElement.querySelector(buttonSelector)
        this._buttonElementTextContent = this._buttonElement.textContent
    }

    getInputValues = () => {
        return this._inputList.reduce((previousValue, input) => {
            previousValue[input.name] = input.value;
            return previousValue
        }, {})
    }

    setInputs = (data) => {
        for (let i=0; i<data.length; i++){
            this._inputList[i].value = data[i]
        }
    }

    renderLoading(isLoading){
        if (isLoading){
            this._buttonElement.textContent = "Saving..."
            this._buttonElement.disabled = true
        } else {
            this._buttonElement.textContent = this._buttonElementTextContent
            this._buttonElement.disabled = false
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

    close(){
        this._formElement.reset()
        super.close()
    }
}