import {domElements} from "./utils.js"

export default class Card {
    constructor({link, name}, selector){
        this._link = link;
        this._name = name;
        this._liked = false;
        this._selector = selector
        this._template = null
        this._element = null;
    }

    _getTemplate(){
        this._template = document.querySelector(this._selector).content;
    }

    _like(e){
        this._liked = !this._liked;
        e.target.classList.toggle("location__button_type_like_active")
    }
    
    _deleteElement(e){
        e.target.parentElement.remove()
        this._element = null
    }
    
    _setImageOverlay(){
        const {imageOverlayElement, imageOverlayText, imageOverlayContainer} = domElements
        imageOverlayElement.src = this._link;
        imageOverlayElement.alt = this._name;
        imageOverlayText.textContent = this._name;
        openOverlay(imageOverlayContainer)
    }

    getElement(){
        this._getTemplate()
        this._element = this._template.querySelector(`.location`).cloneNode(true);
        this._element.querySelector(".location__title").textContent = this._name;
        const imageElement = this._element.querySelector(".location__image"); 
        imageElement.src = this._link;
        imageElement.alt = this._name;
        imageElement.addEventListener("click", this._setImageOverlay)
        this._element.querySelector(".location__button_type_delete").addEventListener("click", this._deleteElement)
        this._element.querySelector(".location__button_type_like").addEventListener("click", this._like)
        return this._element
    }
}