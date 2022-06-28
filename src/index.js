import './styles/index.css'
import { locationsData } from './scripts/data.js';
import { FormValidator } from './scripts/FormValidator.js';
import { validationObject, domElements } from './scripts/constants.js';
import Card from "./scripts/Card.js";
import Section from './scripts/Section';
import PopupWithForm from './scripts/PopupWithForm';
import PopupWithImage from './scripts/PopupWithImage';
import UserInfo from './scripts/UserInfo';

const dashValidatior = new FormValidator(validationObject, domElements.dashForm)
const locationValidator = new FormValidator(validationObject, domElements.locationForm)
const dashInfo = new UserInfo({nameSelector: '.dash__user-title', titleSelector: '.dash__user-subtitle'})
const imageOverlay = new PopupWithImage({popupSelector: '.overlay', containerSelector: '.overlay__location', imageSelector: '.overlay__image', textSelector: '.overlay__location-name'})
const dashOverlay = new PopupWithForm({popupSelector: '.overlay', popupElementSelector: '.overlay__form_type_dash-form', inputSelector: '.form__input'}, (e) => {
    e.preventDefault()
    dashInfo.setUserInfo(dashOverlay._getInputValues())
    dashOverlay.close()
})

const locationOverlay = new PopupWithForm({popupSelector: '.overlay', popupElementSelector: '.overlay__form_type_location', inputSelector: '.form__input'}, (e) => {
    e.preventDefault();
    console.log(locationSection, locationOverlay._getInputValues())
    locationSection.addItem(makeCard(locationOverlay._getInputValues()))
    locationOverlay.close()
})

const locationSection = new Section({data: locationsData, renderer: (location) => {
    locationSection.addItem(makeCard(location))
}}, '.locations')

const makeCard = (data) => {
    const card = new Card(data, "#location-template", imageOverlay.open)
    return card.getElement()
}


domElements.addLocationButton.addEventListener("click", (e) => {
    locationOverlay._popupElement.querySelector(".form").reset()
    locationValidator.clearValidation(locationOverlay._popupElement)
    locationOverlay.open()
})

domElements.editButton.addEventListener("click", (e) => {
    const data = dashInfo.getUserInfo()
    const {name, title} = dashOverlay._popupElement.querySelector('.form').elements;
    name.value = data.name
    title.value = data.title
    dashValidatior.clearValidation(dashOverlay._element)
    dashOverlay.open()
}) 

locationSection.renderItems()
dashValidatior.enableValidation()
locationValidator.enableValidation()