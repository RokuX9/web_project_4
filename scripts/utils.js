import { FormValidator, validationObject } from './validation.js';
export const validatior = new FormValidator(validationObject)

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

function closeOverlayByKey(e){
    if (e.key === "Escape"){
        closeOverlay(document.querySelector(".overlay__element_opened"))
    }
}
function closeOverlayByClick(e){
    if (e.target.classList.contains("overlay_opened") || e.target.classList.contains("overlay__button_type_close")){
        closeOverlay(document.querySelector(".overlay__element_opened"))
    } 
}

export function openOverlay(overlayElement){
    const {overlay} = domElements;
    overlay.classList.add("overlay_opened")
    overlayElement.classList.add("overlay__element_opened")
    document.addEventListener("keydown", closeOverlayByKey)
    overlay.addEventListener("mousedown", closeOverlayByClick)
}

export function closeOverlay(overlayElement){
    const {overlay} = domElements;
    overlay.classList.remove("overlay_opened")
    overlayElement.classList.remove("overlay__element_opened")
    document.removeEventListener("keydown", closeOverlayByKey)
    overlay.removeEventListener("mousedown", closeOverlayByClick)
}

domElements.addLocationButton.addEventListener("click", (e) => {
    const {locationForm} = domElements
    locationForm.querySelector("form").reset()
    validatior.clearValidation(locationForm)
    openOverlay(locationForm)
})

domElements.editButton.addEventListener("click", (e) => {
    const {userTitle, userSubtitle, nameDashInput, subtitleDashInput, dashForm, overlay} = domElements;
    nameDashInput.value = userTitle.textContent;
    subtitleDashInput.value = userSubtitle.textContent;
    validatior.clearValidation(dashForm)
    openOverlay(dashForm)
})

domElements.locationForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const {nameLocationInput, imageLocationInput, locationsContainer, locationForm} = domElements;
    const name =  nameLocationInput.value
    const link = imageLocationInput.value
    const card = new Card({name, link}, "#location-template")
    locationsContainer.prepend(card.getElement())
    closeOverlay(locationForm)
})

domElements.dashForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const {userTitle, userSubtitle, nameDashInput, subtitleDashInput, dashForm} = domElements;
    userTitle.textContent = nameDashInput.value
    userSubtitle.textContent = subtitleDashInput.value
    closeOverlay(dashForm)
})