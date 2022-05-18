import './index.css';
import Card from '../components/Сard.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

const profileButton = document.querySelector('.person__edit-button');
const profileForm = document.querySelector('.popup__form')
const profilePopup = document.querySelector('.profile-popup');
const nameContainer = document.querySelector('.popup__input_type_name');
const nameValue = document.querySelector('.person__name'); //
const employmentContainer = document.querySelector('.popup__input_type_employment');
const employmentValue = document.querySelector('.person__employment'); //
const cardPopup = document.querySelector('.cardPopup');

const cardsContainer = document.querySelector('.cards');


const adderButton = document.querySelector('.add-button');
const cardForm = document.querySelector('.cardPopup__form');
const inputCardname = document.querySelector('.cardPopup__input_type_cardname');
const inputLink = document.querySelector('.cardPopup__input_type_link');

//unsplash API section
// const clientID = 'wKvBf9c4PeaJ6-R6hcNgfpyy6JYkQtMtf22X1bsxYGA';
// const endpoint = `https://api.unsplash.com/photos/?client_id=${clientID}`

// function renderRandomSource() {
//     fetch(endpoint)
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(jsonData) {
//             return { name: jsonData.user.name, link: jsonData.urls.regular };
//         });

// }

const initialCards = [
    // renderRandomSource(),
    {
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

const personProfile = new UserInfo({
    name: nameValue,
    employment: employmentValue
});

const userPopup = new PopupWithForm('.profile-popup', (data) => {
    personProfile.setUserInfo(data);
    userPopup.closePopup();
});

userPopup.setEventListeners();




profileButton.addEventListener('click', () => {
    const userData = personProfile.getUserInfo();
    nameContainer.value = userData.name;
    employmentContainer.value = userData.employment;
    validators['profile-form'].resetValidation();
    userPopup.showPopup();

})




const validators = {};

function enableValidation(conf) {
    const formList = Array.from(document.querySelectorAll(conf.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(formElement, conf);
        const formName = formElement.getAttribute('name');
        validators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(conf);




const showImagePopup = new PopupWithImage('.show-image');
showImagePopup.setEventListeners();





const createCard = (data) => {
    const cardElement = new Card({
            data: data,
            handleCardClick: (name, link) => {
                showImagePopup.showPopup(link, name);
            }
        },
        '.template');
    return cardElement.generateCard();
}



const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            cardList.addItem(createCard(item));
        },
    },
    '.cards');

cardList.renderItems();




const adderPopup = new PopupWithForm('.cardPopup', (data) => {
    cardList.addItem(createCard(data));
    adderPopup.closePopup();
});


adderButton.addEventListener('click', () => {
    validators['adder-form'].resetValidation();
    adderPopup.showPopup();
});
//////////////////////////





// function addCard(evt) {
//     evt.preventDefault();
//     const item = {
//         name: inputCardname.value,
//         link: inputLink.value
//     }
//     const card = createCard(item)
//     cardsContainer.prepend(card);
//     closePopup(cardPopup);
//     cardForm.reset();
// };

// cardForm.addEventListener('submit', addCard);