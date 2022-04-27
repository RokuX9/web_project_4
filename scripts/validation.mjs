function showInputError(formElement, inputElement, errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add("form__input_error")
    errorElement.textContent = errorMessage
    errorElement.classList.add("form__input-text-error_active")
}

function hideInputError(formElement, inputElement){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove("form__input_error")
    errorElement.textContent = ""
    errorElement.classList.remove("form__input-text-error_active")
}

function checkInputValidity(formElement, inputElement){
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
        hideInputError(formElement, inputElement)
    }
}

function hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid)
}

function toggleButtonState(inputList, buttonElement){
    if (hasInvalidInput(inputList)){
        buttonElement.classList.add("button_inactive")
    } else {
        buttonElement.classList.remove("button_inactive")
    }
}

function setEventListeners(formElement){
    const inputList = Array.from(formElement.querySelectorAll(".form__input"))
    const buttonElement = formElement.querySelector(".form__button_type_save")
    toggleButtonState(inputList, buttonElement)
    inputList.forEach(inputElement => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement)
            toggleButtonState(inputList, buttonElement)
        })
    })
}

function enableValidation(){
    const formList = Array.from(document.querySelectorAll(".form"))
    formList.forEach(formElement => {
        formElement.addEventListener("submit", (e) => {
            e.preventDefault()
        })  
        setEventListeners(formElement)
    })
}

enableValidation()

export const validate = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".form__input"))
    const buttonElement = formElement.querySelector(".form__button_type_save")
    inputList.forEach(inputElement => {
        checkInputValidity(formElement, inputElement)
        toggleButtonState(inputList, buttonElement)
    })
}