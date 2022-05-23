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
const profilePopupSelector = document.querySelector('.profile-popup');
const nameContainer = document.querySelector('.popup__input_type_name');
const employmentContainer = document.querySelector('.popup__input_type_employment');
const adderButton = document.querySelector('.add-button');
const adderPopupSelector = document.querySelector('.cardPopup');
const popupAvatarSelector = document.querySelector('.popupAvatar');
const imagePopupSelector = document.querySelector('.show-image');
const popupConfirmSelector = document.querySelector('.popupConfirm');




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


// const personProfile = new UserInfo({
//     name: nameValueSelector,
//     employment: employmentValueSelector
// });



/////////////////  done
const userInfo = new UserInfo(name, about, avatar);
let userId;
api.getUserInfo()
    .then((data) => {
        userId = data._id;
        userInfo.setUserInfo(data);
    })
    .catch((err) => {
        console.log(err);
    })



//////////////////////////////////////////////// проверить links
function createCard(data) {
    const card = new Card({
        data: data,
        userId: userId,
        clickHandlers: {
            handleCardClick: (title, link) => {
                popupImage.open(title, link)
            },
            handleLikeClick: (cardId, isLiked) => {
                return api.likeCard(cardId, isLiked)
            },
            handleDeleteIconClick: (cardObject) => {
                popupConfirm.cardObject = cardObject;
                popupConfirm.open()
            }
        }
    }, '.template');
    const cardElement = card.createCard();
    card.markUserLikes(cardElement);
    card.updateLikes(cardElement);
    return cardElement;
}



/////////////// done
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



////////////////////// done
const adderPopup = new PopupWithForm({
    popupSelector: adderPopupSelector,
    handleFormSubmit: (info) => {
        renderLoading(adderPopupSelector, true);
        api.postNewCard(info.title, info.link)
            .then((data) => {
                const cardElement = createCard(data);
                cardsList.addItem(cardElement);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() =>
                renderLoading(adderPopupSelector, false))

    }
});


///////////////// check me!!! may be done
adderPopup.setEventListeners();
adderButton.addEventListener('click', () => {
    validators['adder-form'].resetValidation();
    adderPopup.showPopup();
});



///////////// done
const userPopup = new PopupWithForm({
    popupSelector: profilePopupSelector,
    handleFormSubmit: (info) => {
        renderLoading(profilePopupSelector, true);
        api.setUserInfo(info.name, info.job)
            .then((data) => {
                userInfo.setUserInfo(data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() =>
                renderLoading(profilePopupSelector, false))
    }
})


//////////////////// check!! may be done
userPopup.setEventListeners();

profileButton.addEventListener('click', () => {
    const userData = personProfile.getUserInfo();
    nameContainer.value = userData.name;
    employmentContainer.value = userData.employment;
    validators['profile-form'].resetValidation();
    userPopup.showPopup();
});
/////////////////////






////////////////// check
const popupWithFormAvatar = new PopupWithForm({
    popupSelector: popupAvatarSelector,
    handleFormSubmit: (info) => {
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
});



updateAvatarButton.addEventListener('click', function() {
    popupWithFormAvatar.showPopup();
});



/////////////done
const popupImage = new PopupWithImage(imagePopupSelector);


/////////////// done
const popupConfirm = new PopupWithConfirm({
    popupSelector: popupConfirmSelector,
    handleDeleteButtonClick: () => {
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
});



/////////////done
function renderLoading(popup, isLoading) {
    const submitButton = popup.querySelector('.popup__submit-button');
    if (isLoading) {
        submitButton.textContent = 'Сохранение...'
    } else {
        submitButton.textContent = 'Сохранить'
    }
}



///////////// check me! may be it`s done
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




// const createCard = (data) => {
//     const cardElement = new Card({
//             data: data,
//             handleCardClick: (name, link) => {
//                 showImagePopup.showPopup(link, name);
//             }
//         },
//         '.template');
//     return cardElement.generateCard();
// }