import {clearValidation} from './validation.js';

const domElements = {
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

function openOverlay(overlayElement){
    const {overlay} = domElements;
    overlay.classList.add("overlay_opened")
    overlayElement.classList.add("overlay__element_opened")
    document.addEventListener("keydown", closeOverlayByKey)
    overlay.addEventListener("mousedown", closeOverlayByClick)
}

function closeOverlay(overlayElement){
    const {overlay} = domElements;
    overlay.classList.remove("overlay_opened")
    overlayElement.classList.remove("overlay__element_opened")
    document.removeEventListener("keydown", closeOverlayByKey)
    overlay.removeEventListener("mousedown", closeOverlayByClick)
}
/* 
function toggleOverlay(overlayElement){
    const {overlay} = domElements;
    overlayElement.classList.toggle("overlay__element_opened")
    overlay.classList.toggle("overlay_opened")
} 
function handleOverlayEvents(overlay, overlayElement){
    const removeListeners = () => {
        document.removeEventListener("keydown", closeOverlayByKey)
        overlay.removeEventListener("mousedown", closeOverlayByClick)
        overlayElement.removeEventListener("submit", closeOverlayBySubmit) 
    }
    const closeOverlayByKey = (e) => {
        if (e.key === "Escape"){
            toggleOverlay(overlayElement)
            removeListeners()
        }
    }
    const closeOverlayByClick = (e) => {
        if (e.target.classList.contains("overlay_opened") || e.target.classList.contains("overlay__button_type_close")){
            toggleOverlay(overlayElement)
            removeListeners()
        } 
    }
    const closeOverlayBySubmit = () => {
        toggleOverlay(overlayElement)
        removeListeners()
    }
    if (!overlay.classList.contains("overlay_opened")){
        toggleOverlay(overlayElement)
        document.addEventListener("keydown", closeOverlayByKey)
        overlay.addEventListener("mousedown", closeOverlayByClick)
        overlayElement.addEventListener("submit", closeOverlayBySubmit)
    }
} 
*/

function deleteLocation(e){
    e.target.parentElement.remove()
}

function likeLocation(e){
    e.target.classList.toggle("location__button_type_like_active")
}


function createCard(locationData){
    const {name, link} = locationData
    const locationElement = domElements.locationTemplate.querySelector(".location").cloneNode(true);
    locationElement.querySelector(".location__title").textContent = locationData.name
    const imageElement = locationElement.querySelector(".location__image") 
    imageElement.src = link
    imageElement.alt = name
    imageElement.addEventListener("click", (e) => {
        const {imageOverlayElement, imageOverlayText} = domElements
        imageOverlayElement.src = link;
        imageOverlayElement.alt = name
        imageOverlayText.textContent = name
        openOverlay(domElements.imageOverlayContainer)
    })
    locationElement.querySelector(".location__button_type_delete").addEventListener("click", deleteLocation)
    locationElement.querySelector(".location__button_type_like").addEventListener("click", likeLocation)
    return locationElement
}

const locationsData = [
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
      },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
      },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
      },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
      },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
      },
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
      },
]

domElements.addLocationButton.addEventListener("click", (e) => {
    const {locationForm} = domElements
    locationForm.querySelector("form").reset()
    clearValidation(locationForm)
    openOverlay(locationForm)
})

domElements.editButton.addEventListener("click", (e) => {
    const {userTitle, userSubtitle, nameDashInput, subtitleDashInput, dashForm, overlay} = domElements;
    nameDashInput.value = userTitle.textContent;
    subtitleDashInput.value = userSubtitle.textContent;
    clearValidation(dashForm)
    openOverlay(dashForm)
})

domElements.locationForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const {nameLocationInput, imageLocationInput, locationsContainer, locationForm} = domElements;
    const name =  nameLocationInput.value
    const link = imageLocationInput.value
    locationsContainer.prepend(createCard({name, link}))
    closeOverlay(locationForm)
})

domElements.dashForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const {userTitle, userSubtitle, nameDashInput, subtitleDashInput, dashForm} = domElements;
    userTitle.textContent = nameDashInput.value
    userSubtitle.textContent = subtitleDashInput.value
    closeOverlay(dashForm)
})

locationsData.forEach(location => {
    domElements.locationsContainer.prepend(createCard(location))
})