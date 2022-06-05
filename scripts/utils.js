import { FormValidator} from './FormValidator.js';
import { domElements } from './constants.js';



function closeOverlayByKey(e){
    if (e.key === "Escape"){
        closeOverlay(document.querySelector(".overlay__element_opened"))
    }
}
function closeOverlayByClick(e){
    if (e.target.classList.contains("overlay_opened") || e.target.classList.contains("overlay__button_type_close")){
        closeOverlay(document.querySelector(".overlay__element_opened"))
    } 
}

export function openOverlay(overlayElement){
    const {overlay} = domElements;
    overlay.classList.add("overlay_opened")
    overlayElement.classList.add("overlay__element_opened")
    document.addEventListener("keydown", closeOverlayByKey)
    overlay.addEventListener("mousedown", closeOverlayByClick)
}

export function closeOverlay(overlayElement){
    const {overlay} = domElements;
    overlay.classList.remove("overlay_opened")
    overlayElement.classList.remove("overlay__element_opened")
    document.removeEventListener("keydown", closeOverlayByKey)
    overlay.removeEventListener("mousedown", closeOverlayByClick)
}