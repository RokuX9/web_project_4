import './index.css'
import { locationsData } from '../utils/data.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationObject, domElements } from '../utils/constants.js';
import Card from "../components/Card.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const dashValidatior = new FormValidator(validationObject, domElements.dashForm)
const locationValidator = new FormValidator(validationObject, domElements.locationForm)
const dashInfo = new UserInfo({nameSelector: '.dash__user-title', titleSelector: '.dash__user-subtitle'})
const imageOverlay = new PopupWithImage({popupSelector: '.overlay', containerSelector: '.overlay__location', imageSelector: '.overlay__image', textSelector: '.overlay__location-name'})
const dashOverlay = new PopupWithForm({popupSelector: '.overlay', popupElementSelector: '.overlay__form_type_dash-form', inputSelector: '.form__input'}, (e) => {
    e.preventDefault()
    dashInfo.setUserInfo(dashOverlay.getInputValues())
    dashOverlay.close()
})

const locationOverlay = new PopupWithForm({popupSelector: '.overlay', popupElementSelector: '.overlay__form_type_location', inputSelector: '.form__input'}, (e) => {
    e.preventDefault();
    locationSection.addItem(makeCard(locationOverlay.getInputValues()))
    locationOverlay.close()
})

const locationSection = new Section({data: locationsData, renderer: (location) => {
    locationSection.addItem(makeCard(location))
}}, '.locations')

const makeCard = (data) => {
    const card = new Card(data, "#location-template", (data) => {
        imageOverlay.setEventListeners();
        imageOverlay.open(data);
    })
    return card.getElement()
}


domElements.addLocationButton.addEventListener("click", (e) => {
    locationValidator.clearValidation()
    locationOverlay.setEventListeners()
    locationOverlay.open()
})

domElements.editButton.addEventListener("click", (e) => {
    const data = dashInfo.getUserInfo()
    const {name, title} = dashOverlay.formInputs
    name.value = data.name
    title.value = data.title
    dashValidatior.clearValidation()
    dashOverlay.setEventListeners()
    dashOverlay.open()
}) 

locationSection.renderItems()
dashValidatior.enableValidation()
locationValidator.enableValidation()