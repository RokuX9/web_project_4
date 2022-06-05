import { locationsData } from './data.js';
import { openOverlay, closeOverlay } from './utils.js';
import { FormValidator } from './FormValidator.js';
import { validationObject, domElements } from './constants.js';
import Card from "./Card.js"

const dashValidatior = new FormValidator(validationObject, domElements.dashForm)
const locationValidator = new FormValidator(validationObject, domElements.locationForm)

const makeCard = (data) => {
    const card = new Card(data, "#location-template")
    return card.getElement()
}


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
    locationsContainer.prepend(makeCard({name, link}))
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
    domElements.locationsContainer.prepend(makeCard(location))
})
dashValidatior.enableValidation()
locationValidator.enableValidation()