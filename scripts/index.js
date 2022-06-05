import { locationsData } from './data.js';
import { domElements, dashValidatior, openOverlay, closeOverlay, locationValidator } from './utils.js';
import Card from "./Card.js"

domElements.addLocationButton.addEventListener("click", (e) => {
    const {locationForm} = domElements
    locationForm.querySelector("form").reset()
    locationValidator.clearValidation(locationForm)
    openOverlay(locationForm)
})

domElements.editButton.addEventListener("click", (e) => {
    const {userTitle, userSubtitle, nameDashInput, subtitleDashInput, dashForm, overlay} = domElements;
    nameDashInput.value = userTitle.textContent;
    subtitleDashInput.value = userSubtitle.textContent;
    dashValidatior.clearValidation(dashForm)
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

locationsData.forEach(location => {
    const card = new Card (location, "#location-template")
    domElements.locationsContainer.prepend(card.getElement())
})
dashValidatior.enableValidation()
locationValidator.enableValidation()