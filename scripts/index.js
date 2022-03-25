const domElements = {
    editButton: document.querySelector(".dash__button_type_edit-info"),
    userTitle: document.querySelector(".dash__user-title"),
    userSubtitle: document.querySelector(".dash__user-subtitle"),
    form: document.querySelector(".dash__form"),
    nameInput: document.querySelector(".form__input-name"),
    subtitleInput: document.querySelector(".form__input-subtitle"),
    saveButton: document.querySelector(".form__button_type_save"),
    closeButton: document.querySelector(".form__button_type_close"),
    overlay: document.querySelector(".overlay"),
    likeButtons: document.querySelectorAll(".location__like-button")
}

domElements.likeButtons.forEach(button => {
    button.addEventListener("click", ()=>button.classList.toggle("location__like-button_type_active"))
});

function toggleForm(){
    const {form, overlay} = domElements;
    overlay.classList.toggle("overlay__opened");
    form.classList.toggle("form__opened");

}

domElements.editButton.addEventListener("click", ()=>{
    const {userTitle, userSubtitle, nameInput, subtitleInput} = domElements;
    nameInput.value = userTitle.textContent;
    subtitleInput.value = userSubtitle.textContent;
    toggleForm();
})
domElements.closeButton.addEventListener("click", (e)=>{
    e.preventDefault();
    toggleForm();
})
domElements.saveButton.addEventListener("click", (e)=>{
    e.preventDefault();
    const {userTitle, userSubtitle, nameInput, subtitleInput} = domElements;
    userTitle.textContent = nameInput.value
    userSubtitle.textContent = subtitleInput.value
    toggleForm()

})
