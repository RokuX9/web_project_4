import './index.css'
import { locationsData } from '../utils/data.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationObject, ApiObject, domElements } from '../utils/constants.js';
import Card from "../components/Card.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'

const apiEntry = new Api(ApiObject)
const dashValidatior = new FormValidator(validationObject, domElements.dashForm)
const locationValidator = new FormValidator(validationObject, domElements.locationForm)
const dashInfo = new UserInfo({nameSelector: '.dash__user-title', aboutSelector: '.dash__user-subtitle'})
const deleteLocationOverlay = new PopupWithForm({popupSelector: '.overlay', popupElementSelector: '.overlay__form_type_delete-location', inputSelector: '.form__input'}, (e) => {
    e.preventDefault()
    apiEntry.deleteCard(deleteLocationOverlay.getInputValues()).then(res => {
        deleteLocationOverlay.close()})
})
const imageOverlay = new PopupWithImage({popupSelector: '.overlay', containerSelector: '.overlay__location', imageSelector: '.overlay__image', textSelector: '.overlay__location-name'})
const dashOverlay = new PopupWithForm({popupSelector: '.overlay', popupElementSelector: '.overlay__form_type_dash-form', inputSelector: '.form__input'}, (e) => {
    e.preventDefault()
    apiEntry.setUserInfo(dashOverlay.getInputValues()).then(res => dashInfo.setUserInfo(res))
    dashOverlay.close()
})

const locationOverlay = new PopupWithForm({popupSelector: '.overlay', popupElementSelector: '.overlay__form_type_location', inputSelector: '.form__input'}, (e) => {
    e.preventDefault();
    apiEntry.addNewCard(locationOverlay.getInputValues()).then(res => {
        const {id} = dashInfo.getUserInfo()
        locationSection.addItem(makeCard(res,id))
    })
    locationOverlay.close()
})

const locationSection = new Section({data: null, renderer: (location) => {
    const {id} = dashInfo.getUserInfo()
    locationSection.addItem(makeCard(location, id))
}}, '.locations')

const makeCard = (data, userId) => {
    const isOwner = userId === data.owner._id ? true : false
    console.log(data.owner._id, userId, isOwner)
    const card = new Card(data, "#location-template", isOwner, (data) => {
        imageOverlay.setEventListeners();
        imageOverlay.open(data);
    }, () => {
        deleteLocationOverlay.formInputs.id.value = data._id
        deleteLocationOverlay.setEventListeners()
        deleteLocationOverlay.open()
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
    const {name, about} = dashOverlay.formInputs
    name.value = data.name
    about.value = data.about
    dashValidatior.clearValidation()
    dashOverlay.setEventListeners()
    dashOverlay.open()
})

dashValidatior.enableValidation()
locationValidator.enableValidation()

apiEntry.getInitialCards().then(res => {
    locationSection.getInitialItems(res)
    locationSection.renderItems()
})

apiEntry.getUserInfo().then(res => {
    dashInfo.setUserInfo(res)
})