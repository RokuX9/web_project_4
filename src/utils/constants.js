export const validationObject = {
    formSelector: "form",
    inputSelector: "form__input",
    submitButtonSelector: "form__button_type_save",
    inactiveButtonClass: "button_inactive",
    inputErrorClass: "form__input_error",
    errorClass: "form__input-text-error_active"
}

export const ApiObject = {
    baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
    headers: {
        authorization: "af221e9d-d09f-46f1-bd82-7b0c5297a738",
        "Content-Type": "application/json"
    }
}

export const domElements = {
    editButton: document.querySelector(".dash__button_type_edit-info"),
    userTitle: document.querySelector(".dash__user-title"),
    userSubtitle: document.querySelector(".dash__user-subtitle"),
    dashForm: document.querySelector(".overlay__form_type_dash-form"),
    nameDashInput: document.querySelector(".form__input_type_dash-name"),
    subtitleDashInput: document.querySelector(".form__input_type_dash-subtitle"),
    closeDashFormButton: document.querySelector(".overlay__button_type_close"),
    overlay: document.querySelector(".overlay"),
    likeButtons: document.querySelectorAll(".location__like-button"),
    locationsContainer: document.querySelector(".locations"),
    locationTemplate: document.querySelector("#location-template").content,
    locationForm: document.querySelector(".overlay__form_type_location"),
    nameLocationInput: document.querySelector(".form__input_type_location-name"),
    imageLocationInput: document.querySelector(".form__input_type_location-image-url"),
    closeLocationFormButton: document.querySelector(".overlay__form_type_location .overlay__button_type_close"),
    addLocationButton: document.querySelector(".dash__button_type_add-place"),
    imageOverlayContainer: document.querySelector(".overlay__location"),
    imageOverlayElement: document.querySelector(".overlay__image"),
    imageOverlayText: document.querySelector(".overlay__location-name"),
    closeImageOverlayButton: document.querySelector(".overlay__location .overlay__button_type_close")
}