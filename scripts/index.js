import { Card } from './Сard.js';
import { FormValidator } from './FormValidator.js';

const profileButton = document.querySelector('.person__edit-button');
const profileForm = document.querySelector('.popup__form')
const profilePopup = document.querySelector('.profile-popup');
const nameContainer = document.querySelector('.popup__input_type_name');
const nameValue = document.querySelector('.person__name');
const employmentContainer = document.querySelector('.popup__input_type_employment');
const employmentValue = document.querySelector('.person__employment');
const cardPopup = document.querySelector('.cardPopup');
const popupCard = document.querySelector('.show-image');
const cardsContainer = document.querySelector('.cards');
const popupImage = document.querySelector('.show-image__img');
const imageCaption = document.querySelector('.show-image__subscription');
const adderButton = document.querySelector('.add-button');
const cardForm = document.querySelector('.cardPopup__form');
const inputCardname = document.querySelector('.cardPopup__input_type_cardname');
const inputLink = document.querySelector('.cardPopup__input_type_link');


const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const conf = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_type_error-active'
};

const validators = {};

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
})



function showPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscButton);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscButton);
};

function handleEscButton(evt) {
    if (evt.key === 'Escape') {
        const showedPopup = document.querySelector('.popup_opened');
        closePopup(showedPopup);
    }
}



function fillProfileForm() {
    nameContainer.value = nameValue.textContent;
    employmentContainer.value = employmentValue.textContent;
};

function saveProfile(evt) {
    evt.preventDefault();

    nameValue.textContent = nameContainer.value;
    employmentValue.textContent = employmentContainer.value;
    closePopup(profilePopup);
};

profileButton.addEventListener('click', () => {
    validators['profile-form'].resetValidation();
    fillProfileForm();
    showPopup(profilePopup);
});

profileForm.addEventListener('submit', saveProfile);



function handleImageClick(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    imageCaption.textContent = name;
    showPopup(popupCard);
};

function createCard(item) {
    const card = new Card(item, '.template', handleImageClick)
    const cardElement = card.renderCard();
    return cardElement;
};

function renderCard(arr) {
    arr.forEach(element => {
        const card = createCard(element);
        cardsContainer.append(card);
    });
};
renderCard(initialCards);



function enableValidation(conf) {
    const formList = Array.from(document.querySelectorAll(conf.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(formElement, conf)
        const formName = formElement.getAttribute('name')
        validators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(conf);



//form for adding
adderButton.addEventListener('click', () => {
    cardForm.reset();
    validators['adder-form'].resetValidation();
    showPopup(cardPopup);
});

function addCard(evt) {
    evt.preventDefault();
    const item = {
        name: inputCardname.value,
        link: inputLink.value
    }
    const card = createCard(item)
    cardsContainer.prepend(card);
    closePopup(cardPopup);
    cardForm.reset();
};

cardForm.addEventListener('submit', addCard);