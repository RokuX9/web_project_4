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
const dashImageValidator = new FormValidator(validationObject, domElements.dashImageForm)
const dashInfo = new UserInfo({nameSelector: '.dash__user-title', aboutSelector: '.dash__user-subtitle', imageSelector: '.dash__profile-image'})
const imageOverlay = new PopupWithImage({popupSelector: '.overlay', containerSelector: '.overlay__location', imageSelector: '.overlay__image', textSelector: '.overlay__location-name'})
const dashOverlay = new PopupWithForm({popupSelector: '.overlay', popupElementSelector: '.overlay__form_type_dash-form', inputSelector: '.form__input', buttonSelector: '.form__button_type_save'}, (e) => {
    e.preventDefault()
    dashOverlay.renderLoading(true)
    apiEntry.setUserInfo(dashOverlay.getInputValues()).then(res => dashInfo.setUserInfo(res)).finally(res => {
        dashOverlay.renderLoading(false)
        dashOverlay.close()
    })
})

const locationOverlay = new PopupWithForm({popupSelector: '.overlay', popupElementSelector: '.overlay__form_type_location', inputSelector: '.form__input', buttonSelector: '.form__button_type_save'}, (e) => {
    e.preventDefault();
    locationOverlay.renderLoading(true)
    apiEntry.addNewCard(locationOverlay.getInputValues()).then(res => locationSection.addItem(res)).finally(res => {
        locationOverlay.renderLoading(false)
        locationOverlay.close()
    })
})

const dashImageOverlay = new PopupWithForm({popupSelector: '.overlay', popupElementSelector: '.overlay__form_type_dash-image', inputSelector: '.form__input', buttonSelector: '.form__button_type_save'}, (e) => {
    e.preventDefault()
    dashImageOverlay.renderLoading(true)
    apiEntry.changeProfilePicture(dashImageOverlay.getInputValues()).then(res => dashInfo.setUserInfo(res)).finally(res => {
        dashImageOverlay.renderLoading(false)
        dashImageOverlay.close()
    })
})

const makeCard = (data, userId) => {
    const isOwner = userId === data.owner._id ? true : false
    const card = new Card(data, "#location-template", isOwner, (data) => {
        imageOverlay.setEventListeners();
        imageOverlay.open(data);
    }, () => {
        deleteLocationOverlay.formInputs.id.value = data._id
        deleteLocationOverlay.setEventListeners()
        deleteLocationOverlay.open()
    }, {
        like : apiEntry.likeCard,
        unlike: apiEntry.unlikeCard
    })
    const userLikes = card.getLikes().filter(id => {
        return id === userId
    })
    const cardElement = card.getElement()
    if (userLikes.length > 0) card.updateLike()
    return cardElement
}

const locationSection = new Section({data: null, renderer: makeCard }, '.locations', dashInfo.getUserInfo().id)

const deleteLocationOverlay = new PopupWithForm({popupSelector: '.overlay', popupElementSelector: '.overlay__form_type_delete-location', inputSelector: '.form__input', buttonSelector: '.form__button_type_save'}, (e) => {
    e.preventDefault()
    const elementIdObj = deleteLocationOverlay.getInputValues()
    deleteLocationOverlay.renderLoading(true)
    apiEntry.deleteCard(elementIdObj).then(res => {
        locationSection.deleteItem(elementIdObj)
        locationSection.renderElements()
    }).finally(res => {
        deleteLocationOverlay.renderLoading(false)
        deleteLocationOverlay.close()
    })
})

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

domElements.dashImageEditButton.addEventListener("click", (e) => {
    dashImageOverlay.setEventListeners()
    dashImageOverlay.open()
})

dashValidatior.enableValidation()
locationValidator.enableValidation()
dashImageValidator.enableValidation()

apiEntry.getInitialCards().then(res => {
    locationSection.setData(res)
    locationSection.renderElements()
})

apiEntry.getUserInfo().then(res => {
    dashInfo.setUserInfo(res)
    locationSection.setOwner(dashInfo.id)
})