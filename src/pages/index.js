import './index.css';
import Card from '../components/Сard.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/Api.js';

const profileButton = document.querySelector('.person__edit-button');
const profilePopupSelector = '.profile-popup';
const nameContainer = document.querySelector('.popup__input_type_name');
const employmentContainer = document.querySelector('.popup__input_type_employment');
const adderButton = document.querySelector('.add-button');
const adderPopupSelector = '.cardPopup';
const popupAvatarSelector = '.popupAvatar';
const imagePopupSelector = '.show-image';
const popupConfirmSelector = '.popupConfirm';
const updateAvatarButton = document.querySelector('.button_type_avatar');
const name = '.person__name';
const employment = '.person__employment';
const avatar = '.person__image';




const conf = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_type_error-active'
};


const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-41", /////////////проверить
    headers: {
        "content-type": "application/json",
        "authorization": "37e0e7dd-b074-4ce5-8552-85f100e53932", ///////////////проверить
    },
});




const userInfo = new UserInfo(name, employment, avatar);
let userId;
api.getUserInfo()
    .then((data) => {
        userId = data._id;
        userInfo.setUserInfo(data);
    })
    .catch((err) => {
        console.log(err);
    })

const popupImage = new PopupWithImage(imagePopupSelector);

function createCard(data) {
    const card = new Card({
        data: data,
        userId: userId,
        clickHandlers: {
            handleCardClick: (title, link) => {
                popupImage.showPopup(title, link)
            },
            handleLikeClick: (cardId, isLiked) => {
                return api.likeCard(cardId, isLiked)
            },
            handleDeleteClick: (cardObject) => {
                popupConfirm.cardObject = cardObject;
                popupConfirm.showPopup()
            }
        }
    }, '.template')
    const cardElement = card.generateCard();
    card.markUserLikes(cardElement);
    card.updateLikes(cardElement);
    return cardElement;
}



let cardList;

api.getInitialCards()
    .then((data) => {
        cardList = new Section({
                items: data,
                renderer: (item) => {
                    const cardElement = createCard(item);
                    cardList.addItem(cardElement);
                }
            },
            '.cards');
        cardList.renderItems();
    })
    .catch((err) => {
        console.log(err)
    });



const adderPopup = new PopupWithForm(
    '.cardPopup',
    (info) => {
        renderLoading(adderPopupSelector, true);
        api.postNewCard(info.title, info.link)
            .then((data) => {
                const cardElement = createCard(data);
                cardList.addItem(cardElement);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() =>
                renderLoading(adderPopupSelector, false))

    }
);



adderPopup.setEventListeners();
adderButton.addEventListener('click', () => {
    validators['adder-form'].resetValidation();
    adderPopup.showPopup();
});



const userPopup = new PopupWithForm(
    profilePopupSelector, (info) => {
        renderLoading(profilePopupSelector, true);
        api.setUserInfo(info.name, info.employment)
            .then((data) => {
                userInfo.setUserInfo(data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() =>
                renderLoading(profilePopupSelector, false))
    }
);


userPopup.setEventListeners();

profileButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    nameContainer.value = userData.name;
    employmentContainer.value = userData.employment;
    validators['profile-form'].resetValidation();
    userPopup.showPopup();
});



const popupWithFormAvatar = new PopupWithForm(
    popupAvatarSelector,
    (info) => {
        renderLoading(popupAvatarSelector, true);
        api.setAvatar(info.avatarLink)
            .then((data) => {
                userInfo.setUserInfo(data);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() =>
                renderLoading(popupAvatarSelector, false))
    }
);



updateAvatarButton.addEventListener('click', function() {
    popupWithFormAvatar.showPopup();
});



const popupConfirm = new PopupWithConfirm(
    popupConfirmSelector,
    () => {
        const cardId = popupConfirm.cardObject._cardId;
        api.deleteCard(cardId)
            .then(() => {
                popupConfirm.cardObject.deleteCard();
                popupConfirm.closePopup();
                popupConfirm.cardObject = '';
            })
            .catch(err => {
                console.log(err);
            })
    }
);



function renderLoading(popupSelector, isLoading) {
    const submitButton = document.querySelector(popupSelector).querySelector('.popup__submit-button');
    if (isLoading) {
        submitButton.textContent = 'Сохранение...'
    } else {
        submitButton.textContent = 'Сохранить'
    }
};



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