const input = document.querySelector('.movie__input');
const movieList = document.querySelector('#listFilms')

const addBtn = document.querySelector('#movieBtn')

const LS = localStorage;

let movies = [];
let movie = {};

//=======================================================================================
// Сохранение данных из input в localStorage
addBtn.addEventListener('click', function(e) {
   e.preventDefault();
   if (!input.value) {return null}
   start()
});
// Сохранение по клику на чекбокс значения checkbox в localStorage или удаление фильма
movieList.addEventListener ('click', (event) => {
   if (event.target.classList.contains('film__checkbox')) {
      if (movies[event.target.id].checkbox === 'unchecked') {movies[event.target.id].checkbox = 'checked'}
      else {movies[event.target.id].checkbox = 'unchecked'}
      recLS()
   } 
   else if (event.target.classList.contains('film__btn')) {
      movies.splice(event.target.id,1)
      recLS()
      showMovieList();
   }
});

showMovieList();
//=======================================================================================

// Запуск: чтение инпута, создание объекта, запись в LS, показ данных
function start() {
   const title = input.value;
   let checkbox = 'unchecked';
   createMovie(title, checkbox);
   clearInput();
   recLS();
   showMovieList();
}

// Создание объекта "фильм"
function createMovie(title, checkbox) {
   const movie = {
      title: title,
      checkbox: checkbox,
   }
   movies.unshift(movie);
   return movie;
};

// Очищение поля input
function clearInput() {
   input.value = null;
};

// Проверка массива
function checkArray() {
   if (!LS.getItem('movies') == []) {movies = readLS()}
   else {movies = []}
   return movies;
};

// Отрисовка movieList
function renderMovieList() {
   let movieListHTML = '';
   
   for (let i = 0; i < movies.length; i++) {
      movieListHTML += `
         <li id="${i}" class="film">
            <label class="film__inner">
               <input id="${i}" class="film__checkbox" type="checkbox" ${movies[i].checkbox}>
               <span class="fake__checkbox"></span>
               <span class="film__name">${movies[i].title}</span>
            </label>
            <div id="${i}" class="film__btn" title="Удалить"></div>
         </li>
      `
   }
   movieList.innerHTML = movieListHTML;
};

// Вывод movieList
function showMovieList() {
   checkArray()
   renderMovieList(movies)
};

// Запись данных в localStorage
function recLS() {
   return LS.setItem('movies', JSON.stringify(movies))
};

// Чтение данных в localStorage
function readLS() {
   return JSON.parse(LS.getItem('movies'))
};