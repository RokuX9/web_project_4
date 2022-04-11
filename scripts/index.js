const domElements = {
    editButton: document.querySelector(".dash__button_type_edit-info"),
    userTitle: document.querySelector(".dash__user-title"),
    userSubtitle: document.querySelector(".dash__user-subtitle"),
    dashForm: document.querySelector(".overlay__form_type_dash-form"),
    nameDashInput: document.querySelector(".form__input_type_dash-name"),
    subtitleDashInput: document.querySelector(".form__input_type_dash-subtitle"),
    closeDashFormButton: document.querySelector(".overlay__button_type_close"),
    overlay: document.querySelector(".overlay"),
    likeButtons: document.querySelectorAll(".location__like-button"),
    locationsContainer: document.querySelector(".locations"),
    locationTemplate: document.querySelector("#location-template").content,
    locationForm: document.querySelector(".overlay__form_type_location"),
    nameLocationInput: document.querySelector(".form__input_type_location-name"),
    imageLocationInput: document.querySelector(".form__input_type_location-image-url"),
    closeLocationFormButton: document.querySelector(".overlay__form_type_location .overlay__button_type_close"),
    addLocationButton: document.querySelector(".dash__button_type_add-place"),
    imageOverlayContainer: document.querySelector(".overlay__location"),
    imageOverlayElement: document.querySelector(".overlay__image"),
    imageOverlayText: document.querySelector(".overlay__location-name"),
    closeImageOverlayButton: document.querySelector(".overlay__location .overlay__button_type_close")
}

function toggleOverlay(overlayElement){
    const {dashForm, locationForm, imageOverlayContainer, overlay} = domElements;
    
    switch (overlayElement){
        case dashForm:
            overlayElement.classList.toggle("overlay__form_opened")
            break
        case locationForm:
            overlayElement.classList.toggle("overlay__form_opened")
            break
        case imageOverlayContainer:
            overlayElement.classList.toggle("overlay__location_opened")
            break
        default:
            return
    }
    overlay.classList.toggle("overlay_opened")
}

function deleteLocation(e){
    e.target.parentElement.remove()
}

function likeLocation(e){
    e.target.classList.toggle("location__button_type_like_active")
}


function createCard(locationData){
    const {name, link} = locationData
    const locationElement = domElements.locationTemplate.querySelector(".location").cloneNode(true);
    locationElement.querySelector(".location__title").textContent = locationData.name
    const imageElement = locationElement.querySelector(".location__image") 
    imageElement.src = link
    imageElement.alt = name
    imageElement.addEventListener("click", (e)=>{
        const {imageOverlayElement, imageOverlayText} = domElements
        imageOverlayElement.src = link;
        imageOverlayElement.alt = name
        imageOverlayText.textContent = name
        toggleOverlay(domElements.imageOverlayContainer)
    })
    locationElement.querySelector(".location__button_type_delete").addEventListener("click", deleteLocation)
    locationElement.querySelector(".location__button_type_like").addEventListener("click", likeLocation)
    return locationElement

}

const locationsData = [
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
      },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
      },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
      },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
      },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
      },
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
      },
      
     
     
     
      
]

domElements.addLocationButton.addEventListener("click", (e)=>{
    const {locationForm} = domElements
    locationForm.querySelector("form").reset()
    toggleOverlay(domElements.locationForm)
})

domElements.locationForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const {nameLocationInput, imageLocationInput, locationsContainer} = domElements;
    const name =  nameLocationInput.value
    const link = imageLocationInput.value
    locationsContainer.prepend(createCard({name, link}))
    toggleOverlay(domElements.locationForm)
})

domElements.closeLocationFormButton.addEventListener("click", ()=>{
    toggleOverlay(domElements.locationForm)
})

domElements.editButton.addEventListener("click", (e)=>{
    const {userTitle, userSubtitle, nameDashInput, subtitleDashInput} = domElements;
    nameDashInput.value = userTitle.textContent;
    subtitleDashInput.value = userSubtitle.textContent;
    toggleOverlay(domElements.dashForm)
})

domElements.closeDashFormButton.addEventListener("click", ()=>{
    toggleOverlay(domElements.dashForm)
})

domElements.dashForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const {userTitle, userSubtitle, nameDashInput, subtitleDashInput} = domElements;
    userTitle.textContent = nameDashInput.value
    userSubtitle.textContent = subtitleDashInput.value
    toggleOverlay(domElements.dashForm)

})

domElements.closeImageOverlayButton.addEventListener("click", ()=>{
    toggleOverlay(domElements.imageOverlayContainer)
})

locationsData.forEach(location => {
    domElements.locationsContainer.prepend(createCard(location))
})