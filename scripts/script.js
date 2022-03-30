const profileButton = document.querySelector('.person__edit-button');
const profileCloseButton = document.querySelector('.popup__close');
const profileForm = document.querySelector('.popup__form')
// const popup = document.querySelector('.popup');
const profilePopup = document.querySelector('.profile-popup');
const nameContainer = document.querySelector('.popup__input_type_name');
const nameValue = document.querySelector('.person__name');
const employmentContainer = document.querySelector('.popup__input_type_employment');
const employmentValue = document.querySelector('.person__employment');

function showPopup(popup) {
      popup.classList.add('popup_opened');
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

function saveProfile(evt) {
    evt.preventDefault();
    nameContainer.setAttribute('value', nameValue.textContent);
    employmentContainer.setAttribute('value', employmentValue.textContent);
    nameValue.textContent = nameContainer.value;
    employmentValue.textContent = employmentContainer.value;
    closePopup(profilePopup);
};

profileButton.addEventListener('click', () => {showPopup(profilePopup)});
profileCloseButton.addEventListener('click', () => {closePopup(profilePopup)});
profileForm.addEventListener('submit', saveProfile);



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


//render initial cards from some array

const cardList = document.querySelector('.cards'); 
const cardTemplate = document.querySelector('.template').content; 

function createCard(item) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
    //если константы вынести из функции, то карточки будут перезаписываться на одно и то же место и renderCard перестает работать
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__description').textContent = item.name;
    setListeners(cardElement);
    return cardElement;
};

function renderCard(arr) {
    arr.forEach(element => {
        const card = createCard(element);
        cardList.append(card);
    });
};
renderCard(initialCards);


//form for adding

const adder = document.querySelector('.cardPopup');
const adderButton = document.querySelector('.add-button');
const closePopupButton = document.querySelector('.cardPopup__close');
const cardForm = document.querySelector('.cardPopup__form');


adderButton.addEventListener('click', () => {showPopup(adder)});
closePopupButton.addEventListener('click', () => {closePopup(adder)});



function addCard(evt) {
    evt.preventDefault();
    const item = {
        name: document.querySelector('.cardPopup__input_type_cardname').value,
        link: document.querySelector('.cardPopup__input_type_link').value
    }
    const card = createCard(item)
    cardList.prepend(card);
    closePopup(adder);
}

cardForm.addEventListener('submit', addCard);


function deleteCard(event) {
    const cardNear = event.currentTarget.closest('.card');
    cardNear.remove();
}

const popupImage = document.querySelector('.show-image__img');
const popupCard = document.querySelector('.show-image');


function setListeners(card) {
    card.querySelector('.card__like-button').addEventListener('click', event => {
        event.target.classList.toggle('card__like-button_black');
    });
    card.querySelector('.card__trash-button').addEventListener('click', deleteCard);
    card.querySelector('.card__image').addEventListener('click', event => {
        showPopup(popupCard);
        popupImage.src = event.target.src;
        popupImage.alt = card.querySelector('.card__subsection').querySelector('.card__description').textContent;
        document.querySelector('.show-image__subscription').textContent = popupImage.alt;
    });
}

document.querySelector('.show-image__close').addEventListener('click', () => {
    closePopup(popupCard);
});