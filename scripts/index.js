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
    closeimageOverlayButton: document.querySelector(".overlay__location .overlay__button_type_close")
}

function toggleDashForm(){
    const {dashForm, overlay} = domElements;
    if (overlay.classList.contains("overlay_type_opened")) {
        overlay.classList.toggle("overlay_type_closed")
    }
    overlay.classList.toggle("overlay_type_opened");
    dashForm.classList.toggle("overlay__form_opened")
    
}

function toggleLocationForm(){
    const {locationForm, overlay} = domElements;
    if (overlay.classList.contains("overlay_type_opened")) {
        overlay.classList.toggle("overlay_type_closed")
    }
    overlay.classList.toggle("overlay_type_opened")
    locationForm.classList.toggle("overlay__form_opened")
}

function toggleImageOverlay(){
    const {imageOverlayContainer, overlay} = domElements
    if (overlay.classList.contains("overlay_type_opened")) {
        overlay.classList.toggle("overlay_type_closed")
    }
    overlay.classList.toggle("overlay_type_opened")
    imageOverlayContainer.classList.toggle("overlay__location_opened")
}

function deleteLocation(e){
    e.target.parentElement.remove()
}

function likeLocation(e){
    e.target.classList.toggle("location__button_type_like_active")
}


function renderCard(locationData){
    const {name, link} = locationData
    const locationElement = domElements.locationTemplate.querySelector(".location").cloneNode(true);
    locationElement.querySelector(".location__title").textContent = locationData.name
    const imageElement = locationElement.querySelector(".location__image") 
    imageElement.src = link
    imageElement.alt = name
    imageElement.addEventListener("click", ()=>{
        const {imageOverlayElement, imageOverlayText} = domElements
        imageOverlayElement.src = link;
        imageOverlayElement.alt = name
        imageOverlayText.textContent = name
        toggleImageOverlay()
    })
    locationElement.querySelector(".location__button_type_delete").addEventListener("click", deleteLocation)
    locationElement.querySelector(".location__button_type_like").addEventListener("click", likeLocation)
    domElements.locationsContainer.prepend(locationElement)

}

const locationData = [
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

domElements.addLocationButton.addEventListener("click", ()=>{
    const {nameLocationInput, imageLocationInput} = domElements
    nameLocationInput.value = ""
    imageLocationInput.value = ""
    toggleLocationForm()
})

domElements.locationForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const {nameLocationInput, imageLocationInput} = domElements;
    const name =  nameLocationInput.value
    const link = imageLocationInput.value
    renderCard({name, link})
    toggleLocationForm()
})

domElements.closeLocationFormButton.addEventListener("click", toggleLocationForm)

domElements.editButton.addEventListener("click", ()=>{
    const {userTitle, userSubtitle, nameDashInput, subtitleDashInput} = domElements;
    nameDashInput.value = userTitle.textContent;
    subtitleDashInput.value = userSubtitle.textContent;
    toggleDashForm()
})

domElements.closeDashFormButton.addEventListener("click", toggleDashForm)

domElements.dashForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const {userTitle, userSubtitle, nameDashInput, subtitleDashInput} = domElements;
    userTitle.textContent = nameDashInput.value
    userSubtitle.textContent = subtitleDashInput.value
    toggleDashForm()

})

domElements.overlay.addEventListener("animationend", (e)=>{
    if (e.target.classList.contains("overlay_type_closed")){
        e.target.classList.remove("overlay_type_closed")
    }
})

domElements.closeimageOverlayButton.addEventListener("click", toggleImageOverlay)

locationData.forEach(location => renderCard(location))