const profileButton = document.querySelector('.person__edit-button');
const profileCloseButton = document.querySelector('.popup__close');
const profileForm = document.querySelector('.popup__form')
const profilePopup = document.querySelector('.profile-popup');
const nameContainer = document.querySelector('.popup__input_type_name');
const nameValue = document.querySelector('.person__name');
const employmentContainer = document.querySelector('.popup__input_type_employment');
const employmentValue = document.querySelector('.person__employment');
const popupMAin = document.querySelector('.popup');
const cardPopup = document.querySelector('.cardPopup');
const popupCard = document.querySelector('.show-image');


// const popupsArr = Array.from(document.querySelectorAll('.popup'));


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


// function handleOverlayClick(evt) {
//     for (var i = 0; i < popupsArr.length; i++) {
//         popupsArr[i].addEventListener('click', evt => {
//             if (evt.target.classList.contains('popup_opened')) {
//                 closePopup()
//             };
//         });
//     };
// }

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
const cardsContainer = document.querySelector('.cards');
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
    cardPopupButton.setAttribute('disabled');
    const item = {
        name: inputCardname.value,
        link: inputLink.value
    }
    const card = createCard(item)
    cardsContainer.prepend(card);
    closePopup(cardPopup);
    cardForm.reset();
}

cardForm.addEventListener('submit', addCard);

function deleteCard(event) {
    const cardNear = event.currentTarget.closest('.card');
    cardNear.remove();
}

const popupImage = document.querySelector('.show-image__img');

const imageCaption = document.querySelector('.show-image__subscription');

function setListeners(card) {
    card.querySelector('.card__like-button').addEventListener('click', event => {
        event.target.classList.toggle('card__like-button_black');
    });
    card.querySelector('.card__trash-button').addEventListener('click', deleteCard);
    card.querySelector('.card__image').addEventListener('click', event => {
        popupImage.src = event.target.src;
        popupImage.alt = event.target.alt;
        imageCaption.textContent = popupImage.alt;
        showPopup(popupCard);
    });
}

document.querySelector('.show-image__close').addEventListener('click', () => {
    closePopup(popupCard);
});