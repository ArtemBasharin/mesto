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
const editAvatarButton = document.querySelector('.person__button-updateAvatar');
// const updateAvatarButton = document.querySelector('.person__image');
const linkContainer = document.querySelector('.popup__form_input_link');

const name = '.person__name';
const employment = '.person__employment';
const avatar = document.querySelector('.person__image');




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
popupImage.setEventListeners()

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
            handleDeleteClick: (cardInstance) => {
                popupConfirm.cardInstance = cardInstance;
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
    (info, closePopup) => {
        renderLoading(adderPopupSelector, true);
        api.postNewCard(info.name, info.link)
            .then((data) => {
                const cardElement = createCard(data);
                cardList.addItem(cardElement);
                closePopup()
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
    profilePopupSelector, (info, closePopup) => {
        renderLoading(profilePopupSelector, true);
        api.setUserInfo(info.name, info.employment)
            .then((data) => {
                userInfo.setUserInfo(data);
                closePopup()
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
    (info, closePopup) => {
        renderLoading(popupAvatarSelector, true);
        api.setAvatar(info.avatar)
            .then((data) => {
                userInfo.setUserInfo(data);
                closePopup()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() =>
                renderLoading(popupAvatarSelector, false))
    }
);

/////////////////////////
popupWithFormAvatar.setEventListeners();

editAvatarButton.addEventListener('click', function() {
    const userData = userInfo.getUserInfo();
    userData.avatar = linkContainer.value;
    console.log(userData.avatar);
    validators['popupAvatar-form'].resetValidation();
    popupWithFormAvatar.showPopup();
});
////////////////////////////




const popupConfirm = new PopupWithConfirm(
    popupConfirmSelector,
    () => {
        const cardId = popupConfirm.cardInstance._cardId;
        api.deleteCard(cardId)
            .then(() => {
                popupConfirm.cardInstance.deleteCard();
                popupConfirm.closePopup();
                popupConfirm.cardInstance = '';
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