export default class Card {
    constructor(data, selector, isOwner, handleCardClick, handleDeleteClick, handleLikeObj){
        this.id = data._id
        this._isOwner = isOwner
        this._link = data.link;
        this._name = data.name;
        this._liked = false;
        this._selector = selector
        this._element = null;
        this._handleCardClick = handleCardClick
        this._likes = data.likes
        this._handleDeleteClick = handleDeleteClick
        this._handleLikeObj = handleLikeObj
    }

    _getTemplate = () => {
        return document.querySelector(this._selector).content.querySelector(`.location`).cloneNode(true)
    }

    _like = (e) => {
        const updatedLikes = !this._liked ? this._handleLikeObj.like(this.id) : this._handleLikeObj.unlike(this.id)
        updatedLikes.then(res => {
            this._likes = res.likes
            this.updateLike()
        }).catch(this._handleLikeObj.logError)
    }

    getLikes(){
        return this._likes.map(user => user._id)
    }
    
    _openImageOverlay = (e) => {
        if (e.target === this._imageElement){
            this._handleCardClick({name: this._name, link: this._link})
        }
        console.log('image')
    }

    _setEventListeners = () => {
        this._imageElement.addEventListener("click", this._openImageOverlay)
        this._element.querySelector(".location__button_type_delete").addEventListener("click", this._handleDeleteClick)
        this._element.querySelector(".location__button_type_like").addEventListener("click", this._like)
    }

    _removeEventListeners = () => {
        this._imageElement.removeEventListener("click", this._openImageOverlay)
        this._binElement.removeEventListener("click", this._handleDeleteClick)
        this._element.querySelector(".location__button_type_like").removeEventListener("click", this._like)
    }

    _deleteElement = (e) => {
        this._removeEventListeners()
        this._element.remove()
        this._element = null
    }

    updateLike(){
        this._likeCounter.textContent = this._likes.length
        this._liked = !this._liked;
        this._likeButton.classList.toggle("location__button_type_like_active")
    }

    getElement = () => {
        this._element = this._getTemplate();
        this._binElement = this._element.querySelector(".location__button_type_delete")
        if (this._isOwner){
            this._binElement.classList.add("button_visible")
        } 
        this._element.id = this.id
        this._imageElement = this._element.querySelector(".location__image");
        this._likeCounter = this._element.querySelector(".location__like-number") 
        this._likeButton = this._element.querySelector(".location__button_type_like")
        this._element.querySelector(".location__title").textContent = this._name;
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name; 
        this._setEventListeners()
        return this._element
    }
}
