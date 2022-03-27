const domElements = {
    editButton: document.querySelector(".dash__button_type_edit-info"),
    userTitle: document.querySelector(".dash__user-title"),
    userSubtitle: document.querySelector(".dash__user-subtitle"),
    form: document.querySelector(".overlay__dash-form"),
    nameInput: document.querySelector(".form__input_type_name"),
    subtitleInput: document.querySelector(".form__input_type_subtitle"),
    closeButton: document.querySelector(".overlay__button_type_close"),
    overlay: document.querySelector(".overlay"),
    likeButtons: document.querySelectorAll(".location__like-button")
}

/** 
    domElements.likeButtons.forEach(button => {
    button.addEventListener("click", ()=>button.classList.toggle("location__like-button_type_active"))
}); 
**/

domElements.editButton.addEventListener("click", ()=>{
    const {userTitle, userSubtitle, nameInput, subtitleInput, overlay} = domElements;
    nameInput.value = userTitle.textContent;
    subtitleInput.value = userSubtitle.textContent;
    overlay.classList.toggle("overlay__opened");
})
domElements.closeButton.addEventListener("click", (e)=>{
    domElements.overlay.classList.toggle("overlay__opened");
})
domElements.form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const {userTitle, userSubtitle, nameInput, subtitleInput, overlay} = domElements;
    userTitle.textContent = nameInput.value
    userSubtitle.textContent = subtitleInput.value
    overlay.classList.toggle("overlay__opened");

})
