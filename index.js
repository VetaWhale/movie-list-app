const formNode = document.querySelector("#form-film");
const buttonAddFilm = document.querySelector(".button-add");
const filmsList = document.querySelector(".films-list-wrapper");

let films = [];

initFilms();

buttonAddFilm.addEventListener("click", addFilmToList);
filmsList.addEventListener("click", markFilmViewed);
filmsList.addEventListener("click", deleteFilm);

// генерировать фильм
function addFilmToList() {
  const film = getValueFromUser();

  if (film.length > 60) return;

  addFilm(film);

  clearInput();

  saveToLocalStorage();
}

// получить значение от пользователя
function getValueFromUser() {
  const filmFromUser = formNode.value;

  console.log(filmFromUser.length)
  
  return filmFromUser;
}

// добавить фильм
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

// очистить поле ввода
function clearInput() {
  formNode.value = "";
}

// удалить фильм 
function deleteFilm(event) {
  if (event.target.dataset.action === "delete") {
    // родительский элемент
    const parentNode = event.target.closest(".film-item");

    // находим id элемента родителя
    const idParentNode = Number(parentNode.id);

    // находим индекс
    const index = films.findIndex(function (film) {
      if (film.id === idParentNode) {
        return true;
      }
    });

    films.splice(index, 1);

    parentNode.remove();

    saveToLocalStorage();
  }
}

// отметить фильм просмотренным
function markFilmViewed(event) {
  if (event.target.dataset.action === "check") {
    // находим родительский элемент
    const parentNode = event.target.closest(".film-item");
    // находим кнопку отметки родителя
    const markParentNode = event.target.closest(".checkbox");

    const id = Number(parentNode.id);

    // фильм просмотрен
    const filmDone = films.find(function (film) {
      if (film.id === id) {
        return true;
      }
    });

    filmDone.check = !filmDone.check;

    parentNode.classList.toggle("active-film-item");
    markParentNode.classList.toggle("active-checkbox");

    saveToLocalStorage();
  }
}

// сохранить в локальном хранилище
function saveToLocalStorage() {
  localStorage.setItem("films", JSON.stringify(films));
}

// отрисовать фильм
function renderFilm(film) {
  const classFilm = film.check ? "film-item active-film-item" : "film-item";
  const checkFilm = film.check
    ? "checkbox active-checkbox"
    : "checkbox";

  const filmHTML = `<li class="${classFilm}" id="${film.id}">
    <input type="checkbox" name="" id="" class="${checkFilm}" data-action="check">
    <p class="title-film">${film.name}</p>
    <button class="close" data-action="delete"><img src="img/close.svg" alt="" /></button>
    </li>`;

  filmsList.insertAdjacentHTML("beforeend", filmHTML);
}

// взять начальное значение из локального хранилища
function initFilms() {
  if (localStorage.getItem("films")) {
    films = JSON.parse(localStorage.getItem("films"));
  }

  films.forEach((film) => renderFilm(film));
}
