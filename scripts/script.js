import { Card } from './Сard.js';
import { FormValidator } from './FormValidator.js';

const profileButton = document.querySelector('.person__edit-button');
const profileCloseButton = document.querySelector('.popup__close');
const profileForm = document.querySelector('.popup__form')
const profilePopup = document.querySelector('.profile-popup');
const nameContainer = document.querySelector('.popup__input_type_name');
const nameValue = document.querySelector('.person__name');
const employmentContainer = document.querySelector('.popup__input_type_employment');
const employmentValue = document.querySelector('.person__employment');
const popup = document.querySelector('.popup');
const cardPopup = document.querySelector('.cardPopup');
const popupCard = document.querySelector('.show-image');
const cardsContainer = document.querySelector('.cards');



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

profilePopup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(profilePopup);
    }
});

cardPopup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(cardPopup);
    }
});

popupCard.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupCard);
    }
});

function fillProfileForm() {
    nameContainer.value = nameValue.textContent;
    employmentContainer.value = employmentValue.textContent;
}

function saveProfile(evt) {
    evt.preventDefault();

    nameValue.textContent = nameContainer.value;
    employmentValue.textContent = employmentContainer.value;
    closePopup(profilePopup);
};

profileButton.addEventListener('click', () => {
    fillProfileForm();
    showPopup(profilePopup);
});

profileCloseButton.addEventListener('click', () => {
    closePopup(profilePopup);
    profileForm.reset();
});

profileForm.addEventListener('submit', saveProfile);

function handleImageClick(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    imageCaption.textContent = name;
    showPopup(popupCard)
}

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


//form for adding
const adderButton = document.querySelector('.add-button');
const closePopupButton = document.querySelector('.cardPopup__close');
const cardForm = document.querySelector('.cardPopup__form');


adderButton.addEventListener('click', () => { showPopup(cardPopup) });
closePopupButton.addEventListener('click', () => { closePopup(cardPopup) });
const inputCardname = document.querySelector('.cardPopup__input_type_cardname');
const inputLink = document.querySelector('.cardPopup__input_type_link');
const cardPopupButton = document.querySelector('.cardPopup__submit-button');

function addCard(evt) {
    evt.preventDefault();
    const item = {
        name: inputCardname.value,
        link: inputLink.value
    }
    const card = createCard(item)
    cardsContainer.prepend(card);
    closePopup(cardPopup);
    cardPopupButton.classList.add('popup__submit-button_disabled');
    cardPopupButton.setAttribute('disabled', '');
    cardForm.reset();
};

cardForm.addEventListener('submit', addCard);



const popupImage = document.querySelector('.show-image__img');
const imageCaption = document.querySelector('.show-image__subscription');

// 

document.querySelector('.show-image__close').addEventListener('click', () => {
    closePopup(popupCard);
});