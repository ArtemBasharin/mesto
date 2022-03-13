const popButton = document.querySelector('.person__edit-button');
const closeButton = document.querySelector('.popup__close');
const profileForm = document.querySelector('.popup__form')
const popup = document.querySelector('.popup');
const nameContainer = document.querySelector('.popup__input_type_name');
const nameValue = document.querySelector('.person__name');
const employmentContainer = document.querySelector('.popup__input_type_employment');
const employmentValue = document.querySelector('.person__employment');

// const likeButton = document.querySelectorAll('.card__like-button');

function showPopup() {
    nameContainer.setAttribute('value', nameValue.textContent);
    employmentContainer.setAttribute('value', employmentValue.textContent);
    popup.classList.add('popup_opened');
};

function closePopup() {
    popup.classList.remove('popup_opened'); // закрываем ПОПАП без сохранения 
};

function saveProfile(evt) {

    nameValue.textContent = document.querySelector('.popup__input_type_name').value; //что нужно здесь исправить не понял
    employmentValue.textContent = document.querySelector('.popup__input_type_employment').value; // и здесь тоже. 24  и 25 строки присваивают новые значения person__name и person__employment. В 5 и 7 строках объявлены константы. Не пойму, как иначе
    popup.classList.remove('popup_opened'); // закрываем ПОПАП после записи новых значений, это не дубль, а вызов функции в другом случае
    evt.preventDefault();
};


popButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);
profileForm.addEventListener('submit', saveProfile);


// likeButton.forEach(element => {
//     element.addEventListener('click', () => {
//         element.classList.toggle('card__like-button_black')
//     })
// });