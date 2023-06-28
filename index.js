const formNode = document.querySelector("#form-film");
const buttonAddFilm = document.querySelector(".button-add");
const filmsList = document.querySelector(".films-list-wrapper");

let films = [];

renderToLocalStorage();

buttonAddFilm.addEventListener("click", createFilm);
filmsList.addEventListener("click", viewFilm);
filmsList.addEventListener("click", deleteFilm);

function createFilm() {
  const film = getValueFromUser();
  addFilm(film);

  clearInput();

  saveToLocalStorage();
}

function getValueFromUser() {
  const film = formNode.value;
  return film;
}

function addFilm(film) {
  if (!film) return;

  const newFilm = {
    id: Date.now(),
    name: film,
    check: false,
  };

  films.push(newFilm);

  renderFilm(newFilm);
}

function clearInput() {
  formNode.value = "";
}

function deleteFilm(event) {
  if (event.target.dataset.action === "delete") {
    const parentNode = event.target.closest(".film-item");

    const id = Number(parentNode.id);

    const index = films.findIndex(function (film) {
      if (film.id === id) {
        return true;
      }
    });

    films.splice(index, 1);

    parentNode.remove();

    saveToLocalStorage();
  }
}

function viewFilm(event) {
  if (event.target.dataset.action === "check") {
    const parentNode = event.target.closest(".film-item");
    const parentCheckNode = event.target.closest(".checkbox");

    const id = Number(parentNode.id);

    const filmDone = films.find(function (film) {
      if (film.id === id) {
        return true;
      }
    });

    filmDone.check = !filmDone.check;

    parentNode.classList.toggle("active-film-item");
    parentCheckNode.classList.toggle("active-checkbox");

    saveToLocalStorage();
  }
}

function saveToLocalStorage() {
  localStorage.setItem("films", JSON.stringify(films));
}

function renderFilm(film) {
  const classFilm = film.check ? "film-item active-film-item" : "film-item";
  const classCheckboxFilm = film.check
    ? "checkbox active-checkbox"
    : "checkbox";

  const filmHTML = `<li class="${classFilm}" id="${film.id}">
    <input type="checkbox" name="" id="" class="${classCheckboxFilm}" data-action="check">
    <p class="title-film">${film.name}</p>
    <button class="close" data-action="delete"><img src="img/close.svg" alt="" /></button>
    </li>`;

  filmsList.insertAdjacentHTML("beforeend", filmHTML);
}

function renderToLocalStorage() {
  if (localStorage.getItem("films")) {
    films = JSON.parse(localStorage.getItem("films"));
  }

  films.forEach((film) => renderFilm(film));
}
