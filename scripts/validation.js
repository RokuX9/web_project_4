function showInputError(validationObject, formElement, inputElement, errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(validationObject.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(validationObject.errorClass)
}

function hideInputError(validationObject, formElement, inputElement){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(validationObject.inputErrorClass)
    errorElement.textContent = ""
    errorElement.classList.remove(validationObject.errorClass)
}

function checkInputValidity(validationObject, formElement, inputElement){
    if (!inputElement.validity.valid) {
        showInputError(validationObject, formElement, inputElement, inputElement.validationMessage)
    } else {
        hideInputError(validationObject, formElement, inputElement)
    }
}

function hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid)
}

function toggleButtonState(validationObject, inputList, buttonElement){
    if (hasInvalidInput(inputList)){
        buttonElement.classList.add(validationObject.inactiveButtonClass)
    } else {
        buttonElement.classList.remove(validationObject.inactiveButtonClass)
    }
}

function setEventListeners(validationObject, formElement){
    const inputList = Array.from(formElement.querySelectorAll(`.${validationObject.inputSelector}`))
    const buttonElement = formElement.querySelector(`.${validationObject.submitButtonSelector}`)
    toggleButtonState(validationObject, inputList, buttonElement)
    inputList.forEach(inputElement => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(validationObject, formElement, inputElement)
            toggleButtonState(validationObject, inputList, buttonElement)
        })
    })
}

function enableValidation(validationObject){
    const formList = Array.from(document.querySelectorAll(`.${validationObject.formSelector}`))
    formList.forEach(formElement => {
        formElement.addEventListener("submit", (e) => {
            e.preventDefault()
        })  
        setEventListeners(validationObject, formElement)
    })
}

const validationObject = {
    formSelector: "form",
    inputSelector: "form__input",
    submitButtonSelector: "form__button_type_save",
    inactiveButtonClass: "button_inactive",
    inputErrorClass: "form__input_error",
    errorClass: "form__input-text-error_active"
}

enableValidation(validationObject)

export const validate = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".form__input"))
    const buttonElement = formElement.querySelector(".form__button_type_save")
    inputList.forEach(inputElement => {
        checkInputValidity(validationObject, formElement, inputElement)
        toggleButtonState(validationObject, inputList, buttonElement)
    })
}