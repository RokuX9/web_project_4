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
const validatorsObject = {
    dashValidatior: new FormValidator(validationObject, domElements.dashForm),
    locationValidator: new FormValidator(validationObject, domElements.locationForm),
    dashImageValidator: new FormValidator(validationObject, domElements.dashImageForm),
}

const dashInfo = new UserInfo({nameSelector: '.dash__user-title', aboutSelector: '.dash__user-subtitle', imageSelector: '.dash__profile-image'})
const imageOverlay = new PopupWithImage({popupSelector: '.overlay', containerSelector: '.overlay__location', imageSelector: '.overlay__image', textSelector: '.overlay__location-name'})
const dashOverlay = new PopupWithForm({popupSelector: '.overlay', popupElementSelector: '.overlay__form_type_dash-form', inputSelector: '.form__input', buttonSelector: '.form__button_type_save'}, (e) => {
    e.preventDefault()
    dashOverlay.renderLoading(true)
    apiEntry.setUserInfo(dashOverlay.getInputValues()).then(res => dashInfo.setUserInfo(res)).then(res => dashOverlay.close()).finally(res => {
        dashOverlay.renderLoading(false)
    }).catch(apiEntry.logError)
})

const locationOverlay = new PopupWithForm({popupSelector: '.overlay', popupElementSelector: '.overlay__form_type_location', inputSelector: '.form__input', buttonSelector: '.form__button_type_save'}, (e) => {
    e.preventDefault();
    locationOverlay.renderLoading(true)
    apiEntry.addNewCard(locationOverlay.getInputValues()).then(res => locationSection.addItem(res)).then(res => locationOverlay.close()).finally(res => locationOverlay.renderLoading(false)).catch(apiEntry.logError)
})

const dashImageOverlay = new PopupWithForm({popupSelector: '.overlay', popupElementSelector: '.overlay__form_type_dash-image', inputSelector: '.form__input', buttonSelector: '.form__button_type_save'}, (e) => {
    e.preventDefault()
    dashImageOverlay.renderLoading(true)
    apiEntry.changeProfilePicture(dashImageOverlay.getInputValues()).then(res => dashInfo.setUserInfo(res)).then(res => dashImageOverlay.close()).finally(res => dashImageOverlay.renderLoading(false)).catch(apiEntry.logError)
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
        unlike: apiEntry.unlikeCard,
        catch: apiEntry.logError
    })
    const userLikes = card.getLikes().filter(id => {
        return id === userId
    })
    const cardElement = card.getElement()
    if (userLikes.length > 0) card.updateLike()
    return cardElement
}

const locationSection = new Section({data: null, renderer: makeCard }, '.locations')

const deleteLocationOverlay = new PopupWithForm({popupSelector: '.overlay', popupElementSelector: '.overlay__form_type_delete-location', inputSelector: '.form__input', buttonSelector: '.form__button_type_save'}, (e) => {
    e.preventDefault()
    const elementIdObj = deleteLocationOverlay.getInputValues()
    deleteLocationOverlay.renderLoading(true)
    apiEntry.deleteCard(elementIdObj).then(res => {
        locationSection.deleteItem(elementIdObj)
    }).then(res => deleteLocationOverlay.close()).finally(res => deleteLocationOverlay.renderLoading(false)).catch(apiEntry.logError)
})

domElements.addLocationButton.addEventListener("click", (e) => {
    validatorsObject.locationValidator.clearValidation()
    locationOverlay.setEventListeners()
    locationOverlay.open()
})

domElements.editButton.addEventListener("click", (e) => {
    const data = dashInfo.getUserInfo()
    const {name, about} = dashOverlay.formInputs
    name.value = data.name
    about.value = data.about
    validatorsObject.dashValidatior.clearValidation()
    dashOverlay.setEventListeners()
    dashOverlay.open()
})

domElements.dashImageEditButton.addEventListener("click", (e) => {
    validatorsObject.dashImageValidator.clearValidation()
    dashImageOverlay.setEventListeners()
    dashImageOverlay.open()
})


Object.keys(validatorsObject).map(key => {
    validatorsObject[key].enableValidation()
})
Promise.all([apiEntry.getUserInfo(), apiEntry.getInitialCards()]).then(([userData, cards]) => {
    dashInfo.setUserInfo(userData)
    locationSection.setOwner(dashInfo.id)
    locationSection.setData(cards)
    locationSection.renderElements()
}).catch(apiEntry.logError)