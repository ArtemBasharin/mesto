const popButton = document.querySelector('.person__edit-button');
const closeButton = document.querySelector('.popup__close');
const profileForm = document.querySelector('.popup__form')
const popup = document.querySelector('.popup');
const nameContainer = document.querySelector('.popup__input_type_name');
const nameValue = document.querySelector('.person__name');
const employmentContainer = document.querySelector('.popup__input_type_employment');
const employmentValue = document.querySelector('.person__employment');

function showPopup() {
    nameContainer.setAttribute('value', nameValue.textContent);
    employmentContainer.setAttribute('value', employmentValue.textContent);
    popup.classList.add('popup_opened');
};

function closePopup() {
    popup.classList.remove('popup_opened');
};

function saveProfile(evt) {
    evt.preventDefault();
    nameValue.textContent = document.querySelector('.popup__input_type_name').value;
    employmentValue.textContent = document.querySelector('.popup__input_type_employment').value;
    closePopup();
};
popButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);
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

const cardList = document.querySelector('.cards'); // нашли контейнер куда будем клонировать
const cardTemplate = document.querySelector('.template').content; //нашли контейнер шаблона

function renderCard(arr) {

    arr.forEach(element => {
        const card = cardTemplate.querySelector('.card').cloneNode(true); //внутри контейнера шаблона нашли что клонируем
        card.querySelector('.card__image').src = element.link;
        card.querySelector('.card__image').alt = element.name;
        card.querySelector('.card__description').textContent = element.name;
        listeners(card);
        cardList.append(card);
    });

};
renderCard(initialCards);


//form for adding

const adder = document.querySelector('.cardAdder');
const adderButton = document.querySelector('.add-button');
const closeAdderButton = document.querySelector('.cardAdder__close');
const submitAdderButton = document.querySelector('.cardAdder__form');


function showAdder() {
    adder.classList.add('cardAdder_opened');
};

function closeAdder() {
    adder.classList.remove('cardAdder_opened');
};

adderButton.addEventListener('click', showAdder);
closeAdderButton.addEventListener('click', closeAdder);



function addCard(evt) {
    evt.preventDefault();
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    card.querySelector('.card__image').src = document.querySelector('.cardAdder__input_type_link').value;
    card.querySelector('.card__image').alt = document.querySelector('.cardAdder__input_type_cardname').value;
    card.querySelector('.card__description').textContent = document.querySelector('.cardAdder__input_type_cardname').value;
    listeners(card);
    cardList.append(card);
    closeAdder();
}
submitAdderButton.addEventListener('submit', addCard);


function deleteCard(event) {
    const cardNear = event.currentTarget.closest('.card');
    cardNear.remove();
}

const popupImage = document.querySelector('.show-image__img');

// function showImage(el) {

// }


function listeners(card) {
    card.querySelector('.card__like-button').addEventListener('click', event => {
        event.target.classList.toggle('card__like-button_black');
    });
    card.querySelector('.card__trash-button').addEventListener('click', deleteCard);
    card.querySelector('.card__image').addEventListener('click', event => {
        document.querySelector('.show-image').classList.add('show-image_opened');
        popupImage.src = event.target.src;
        popupImage.alt = card.querySelector('.card__subsection').querySelector('.card__description').textContent;
        document.querySelector('.show-image__subscription').textContent = popupImage.alt;
    });
    document.querySelector('.show-image__close').addEventListener('click', () => {
        document.querySelector('.show-image').classList.remove('show-image_opened');

    });
}

document.addEventListener('animationstart', function(e) {
    if (e.animationName === 'fade-in') {
        e.target.classList.add('popup-fade-in');
    }
});

document.addEventListener('animationend', function(e) {
    if (e.animationName === 'fade-out') {
        e.target.classList.remove('popup-fade-in');
    }
});