let popButton = document.querySelector('.person__edit-button');
let closeButton = document.querySelector('.popup__close');
let saveButton = document.querySelector('.popup__button')
let popup = document.querySelector('.popup__container');
let nameContainer = document.querySelector('.popup__name');
let nameValue = document.querySelector('.person__name');
let employmentContainer = document.querySelector('.popup__employment');
let employmentValue = document.querySelector('.person__employment');
nameContainer.setAttribute('value', nameValue.textContent);
employmentContainer.setAttribute('value', employmentValue.textContent);
let likeButton = document.querySelectorAll('.card__like-button');

function hidePopup() {
    popup.classList.add('popup__container_hide');
};

function showPopup() {
    popup.classList.remove('popup__container_hide');
};

function saveProfile(evt) {

    nameValue.textContent = document.querySelector('.popup__name').value;
    employmentValue.textContent = document.querySelector('.popup__employment').value;
    popup.classList.add('popup__container_hide');
    evt.preventDefault();
};

// function activateButton(any) {
//     any.classList.toggle('card__like-button_black');
// };

popButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', hidePopup);
saveButton.addEventListener('click', saveProfile);
// likeButton.addEventListener('click', activateButton);

likeButton.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.toggle('card__like-button_black')
    })
});