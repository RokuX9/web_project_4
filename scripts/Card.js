import { openOverlay } from "./utils.js"
import { domElements } from "./constants.js";

export default class Card {
    constructor(data, selector){
        this._link = data.link;
        this._name = data.name;
        this._liked = false;
        this._selector = selector
        this._element = null;
    }

    _getTemplate = () => {
        return document.querySelector(this._selector).content.querySelector(`.location`).cloneNode(true)
    }

    _like = (e) => {
        this._liked = !this._liked;
        e.target.classList.toggle("location__button_type_like_active")
    }
    
    _deleteElement = (e) => {
        this._element.remove()
        this._element = null
    }
    
    _openImageOverlay = () => {
        const {imageOverlayElement, imageOverlayText, imageOverlayContainer} = domElements
        imageOverlayElement.src = this._link;
        imageOverlayElement.alt = this._name;
        imageOverlayText.textContent = this._name;
        openOverlay(imageOverlayContainer)
    }

    getElement = () => {
        this._element = this._getTemplate();
        this._element.querySelector(".location__title").textContent = this._name;
        const imageElement = this._element.querySelector(".location__image"); 
        imageElement.src = this._link;
        imageElement.alt = this._name;
        imageElement.addEventListener("click", this._openImageOverlay)
        this._element.querySelector(".location__button_type_delete").addEventListener("click", this._deleteElement)
        this._element.querySelector(".location__button_type_like").addEventListener("click", this._like)
        return this._element
    }
}
