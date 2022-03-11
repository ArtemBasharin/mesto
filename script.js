const popButton = document.querySelector('.person__edit-button');
const closeButton = document.querySelector('.popup__close');
const saveButton = document.querySelector('.popup__form')
const popup = document.querySelector('.popup');
const nameContainer = document.querySelector('.popup__input_type_name');
const nameValue = document.querySelector('.person__name');
const employmentContainer = document.querySelector('.popup__input_type_employment');
const employmentValue = document.querySelector('.person__employment');

const likeButton = document.querySelectorAll('.card__like-button');

function showPopup() {
    nameContainer.setAttribute('value', nameValue.textContent);
    employmentContainer.setAttribute('value', employmentValue.textContent);
    popup.classList.add('popup_opened');
};

function closePopup() {
    popup.classList.remove('popup_opened');
};

function saveProfile(evt) {

    nameValue.textContent = document.querySelector('.popup__input_type_name').value;
    employmentValue.textContent = document.querySelector('.popup__input_type_employment').value;
    popup.classList.remove('popup_opened');
    evt.preventDefault();
};


popButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('submit', saveProfile);


// likeButton.forEach(element => {
//     element.addEventListener('click', () => {
//         element.classList.toggle('card__like-button_black')
//     })
// });