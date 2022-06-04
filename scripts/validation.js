export class FormValidator{
    constructor(validationObject){
        this._formSelector = validationObject.formSelector;
        this._inputSelector = validationObject.inputSelector;
        this._submitButtonSelector = validationObject.submitButtonSelector;
        this._inactiveButtonClass = validationObject.inactiveButtonClass;
        this._inputErrorClass = validationObject.inputErrorClass;
        this._errorClass = validationObject.errorClass;
    }

    _showInputError(formElement, inputElement, errorMessage){
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.add(this._inputErrorClass)
        errorElement.textContent = errorMessage
        errorElement.classList.add(this._errorClass)
    }

    _hideInputError(formElement, inputElement){
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.remove(this._inputErrorClass)
        errorElement.textContent = ""
        errorElement.classList.remove(this._errorClass)
    }

    _checkInputValidity(formElement, inputElement){
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage)
        } else {
            this._hideInputError(formElement, inputElement)
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some(inputElement => !inputElement.validity.valid)
    }

    _toggleButtonState(inputList, buttonElement){
        if (this._hasInvalidInput(inputList)){
            buttonElement.classList.add(this._inactiveButtonClass)
            buttonElement.setAttribute("disabled", true)
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass)
            buttonElement.removeAttribute("disabled")
        }
    }

    _setEventListeners(formElement){
        const inputList = Array.from(formElement.querySelectorAll(`.${this._inputSelector}`))
        const buttonElement = formElement.querySelector(`.${this._submitButtonSelector}`)
        this._toggleButtonState(inputList, buttonElement)
        inputList.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(formElement, inputElement)
                this._toggleButtonState(inputList, buttonElement)
            })
        })
    }
    enableValidation(){
        const formList = Array.from(document.querySelectorAll(`.${this._formSelector}`))
        formList.forEach(formElement => {
            formElement.addEventListener("submit", (e) => {
                e.preventDefault()
            })  
            setEventListeners(formElement)
        })
    }
}

export const validationObject = {
    formSelector: "form",
    inputSelector: "form__input",
    submitButtonSelector: "form__button_type_save",
    inactiveButtonClass: "button_inactive",
    inputErrorClass: "form__input_error",
    errorClass: "form__input-text-error_active"
}

export const clearValidation = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(`.${validationObject.inputSelector}`))
    const buttonElement = formElement.querySelector(`.${validationObject.submitButtonSelector}`)
    inputList.forEach(inputElement => {
        hideInputError(validationObject, formElement, inputElement)
        toggleButtonState(validationObject, inputList, buttonElement)
    })
}