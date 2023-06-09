const input = document.querySelector('#movieTitle');
const movieList = document.querySelector('#listFilms')

const addBtn = document.querySelector('#movieBtn')

const LS = localStorage;
const MOVIES_STORAGE_LABEL = 'movies';

let movies = [];
let movie = {};

//=======================================================================================
// addBtn.addEventListener('click', addBtnHandler);
addBtn.addEventListener('click', validateInput);

renderMovieList();
//=======================================================================================

//
function validateInput(e) {
   e.preventDefault();
   if (!input.value ||  input.value.trim() == "" || input.value == "ㅤ") {clearValue(input); return null}
   addBtnHandler();
   input.focus();
}

// Запуск: чтение инпута, создание объекта, запись в LS, показ данных
function addBtnHandler() {
   const title = input.value;
   let checkboxValue = 'unchecked';
   createMovie(movies, title, checkboxValue);
   clearValue(input);
   recLS(MOVIES_STORAGE_LABEL, movies);
   renderMovieList();
}

// Вывод movieList
function renderMovieList() {
   getMoviesArray(MOVIES_STORAGE_LABEL, movies)
   renderMovieItem(movies)
};

// Получение массива
function getMoviesArray(key, array) {
   if (!LS.getItem(key) == []) {movies = readLS(key)}
   else {array = []}
   return array;
};

// Отрисовка movieItem
function renderMovieItem(array) {
   movieList.innerHTML = '';
   for (let i = 0; i < array.length; i++) {

      let film = document.createElement('li');
      let filmInner = document.createElement('label')
      let filmCheckbox = document.createElement('input');
      let fakeCheckbox = document.createElement('span');
      let filmName = document.createElement('span');
      let filmBtn = document.createElement('div');

      film.className = 'film';
      filmInner.className = 'film__inner';
      filmCheckbox.className = 'film__checkbox';
      fakeCheckbox.className = 'fake__checkbox';
      filmName.className = 'film__name';
      filmBtn.className = 'film__btn';

      film.setAttribute('id', i);
      filmCheckbox.setAttribute('id', i);
      filmCheckbox.setAttribute('type', 'checkbox');
      filmCheckbox.setAttribute(`${array[i].checkboxValue}`, '');
      filmBtn.setAttribute('id', i);
      filmBtn.setAttribute('title', 'Удалить');

      movieList.appendChild(film);
      film.appendChild(filmInner);
      filmInner.appendChild(filmCheckbox);
      filmInner.appendChild(fakeCheckbox);
      filmInner.appendChild(filmName);
      film.appendChild(filmBtn);

      filmName.innerHTML = `${array[i].title}`;
      
      filmCheckbox.addEventListener('click', () => {
         if (array[i].checkboxValue === 'unchecked') {array[i].checkboxValue = 'checked', console.log(array[i].checkboxValue)}
         else {array[i].checkboxValue = 'unchecked', console.log(array[i].checkboxValue)}
         recLS(MOVIES_STORAGE_LABEL, array)
      })
      
      filmBtn.addEventListener('click', () => {
         removeFilm(array, i);
         recLS(MOVIES_STORAGE_LABEL, array);
         renderMovieItem(array);
      })
   }
};

// Создание объекта "фильм"
function createMovie(array, title, checkboxValue) {
   const movie = {
      title: title,
      checkboxValue: checkboxValue,
   }
   array.unshift(movie);
   return movie;
};

// Очищение поля input
function clearValue(element) {
   element.value = null;
};

// Запись данных в localStorage
function recLS(key, value) {
   return LS.setItem(key, JSON.stringify(value))
};

// Чтение данных из localStorage
function readLS(key) {
   return JSON.parse(LS.getItem(key))
};

// Удаление элемента из списка
function removeFilm(array, i) {
   array.splice(i,1)
}
//-------------------------------------------------------------------------------------------------

// Отрисовка movieList
// function renderMovieItem(array) {
//    let movieListHTML = '';
//
//    for (let i = 0; i < array.length; i++) {
//       movieListHTML += `
//          <li id="${i}" class="film">
//             <label class="film__inner">
//                <input id="${i}" class="film__checkbox" type="checkbox" ${array[i].checkboxValue}>
//                <span class="fake__checkbox"></span>
//                <span class="film__name">${array[i].title}</span>
//             </label>
//             <div id="${i}" class="film__btn" title="Удалить"></div>
//          </li>
//       `
//    }
//    movieList.innerHTML = movieListHTML;
// };

// Сохранение по клику на чекбокс значения checkbox в localStorage или удаление фильма
// movieList.addEventListener ('click', (event) => {
//    if (event.target.classList.contains('film__checkbox')) {
//       if (movies[event.target.id].checkboxValue === 'unchecked') {movies[event.target.id].checkboxValue = 'checked'}
//       else {movies[event.target.id].checkboxValue = 'unchecked'}
//       recLS(MOVIES_STORAGE_LABEL, movies)
//    } 
//    if (event.target.classList.contains('film__btn')) {
//       removeFilm(movies)
//       recLS(MOVIES_STORAGE_LABEL, movies)
//       renderMovieList();
//    }
// });

// function createElement (tag, className, id = '', text = '') {
//    tag = document.createElement(tag);
//    tag.setAttribute('class', className)
//    tag.setAttribute('id', id)
//    tag.innerText = text;

//    return tag;
// }
// function createInputElement (tag, className, id = '', type = '') {
//    tag = document.createElement(tag);
//    tag.setAttribute('class', className)
//    tag.setAttribute('id', id)
//    tag.setAttribute('type', type)

//    return tag;
// }

