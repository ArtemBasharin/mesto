import './index.css';
import Card from '../components/Сard.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/Api.js';
import {
    profileButton,
    profilePopupSelector,
    nameContainer,
    employmentContainer,
    adderButton,
    adderPopupSelector,
    popupAvatarSelector,
    imagePopupSelector,
    popupConfirmSelector,
    editAvatarButton,
    name,
    employment,
    avatar,
    conf
} from '../utils/constants.js';

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-41",
    headers: {
        "content-type": "application/json",
        "authorization": "37e0e7dd-b074-4ce5-8552-85f100e53932",
    },
});


const userInfo = new UserInfo(name, employment, avatar);
let userId;


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

                popupConfirm.showPopup();
            }
        }
    }, '.template')
    const cardElement = card.generateCard();
    return cardElement;
}


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

popupWithFormAvatar.setEventListeners();



editAvatarButton.addEventListener('click', function() {
    const userData = userInfo.getUserInfo();
    console.log(userData.avatar);
    validators['popupAvatar-form'].resetValidation();
    popupWithFormAvatar.showPopup();
});


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
            });
    }
);

popupConfirm.setEventListeners();


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


let cardList;


Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then((data) => {
        userId = data[0]._id;
        userInfo.setUserInfo(data[0]);

        cardList = new Section({
                items: data[1],
                renderer: (item) => {
                    const cardElement = createCard(item);
                    cardList.addItem(cardElement);
                }
            },
            '.cards');
        cardList.renderItems(data[1]);

    })
    .catch((err) => console.log(err));