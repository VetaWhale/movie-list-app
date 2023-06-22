const formNode = document.querySelector('#form-film');
const buttonAddFilm = document.querySelector('.button-add');
const filmsList = document.querySelector('.films-list-wrapper');

buttonAddFilm.addEventListener('click', addFilm);
filmsList.addEventListener('click', viewFilm);
filmsList.addEventListener('click', deleteFilm);

function addFilm() {
    const film = formNode.value;

    if (!film) return;

    const filmHTML = `<li class="film-item">
    <input type="checkbox" name="" id="" class="checkbox" data-action="check">
    <p class="title-film">${film}</p>
    <button class="close" data-action="delete"><img src="img/close.svg" alt="" /></button>
    </li>`

    filmsList.insertAdjacentHTML('beforeend', filmHTML);

    formNode.value = "";
}

function deleteFilm(event) {
    if (event.target.dataset.action === 'delete') {
        const parentNode = event.target.closest('.film-item');
        parentNode.remove();
    }
}

function viewFilm(event) {
    if (event.target.dataset.action === 'check') {
        const parentNode = event.target.closest('.film-item');
        parentNode.classList.toggle('active-film-item');
    }
}