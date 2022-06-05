import { locationsData } from './data.js';
import { domElements, validatior } from './utils.js';
import Card from "./Card.js"

locationsData.forEach(location => {
    const card = new Card (location, "#location-template")
    domElements.locationsContainer.prepend(card.getElement())
})
validatior.enableValidation()