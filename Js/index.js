const input = document.querySelector('.movie__input');
const movieList = document.querySelector('#listFilms')

const addBtn = document.querySelector('#movieBtn')

const LS = localStorage;
const MOVIES_STORAGE_LABEL = 'movies';

let movies = [];
let movie = {};

//=======================================================================================
// Сохранение данных из input в localStorage
addBtn.addEventListener('click', function(e) {
   e.preventDefault();
   if (!input.value ||  input.value.trim() == "") {clearValue(input); return null}
   start()
});
// Сохранение по клику на чекбокс значения checkbox в localStorage или удаление фильма
// movieList.addEventListener ('click', (event) => {
//    if (event.target.classList.contains('film__checkbox')) {
//       if (movies[event.target.id].checkbox === 'unchecked') {movies[event.target.id].checkbox = 'checked'}
//       else {movies[event.target.id].checkbox = 'unchecked'}
//       recLS('movies', movies)
//    } 
//    if (event.target.classList.contains('film__btn')) {
//       removeObject(movies)
//       recLS('movies', movies)
//       showMovieList();
//    }
// });

showMovieList();
//=======================================================================================

// Запуск: чтение инпута, создание объекта, запись в LS, показ данных
function start() {
   const title = input.value;
   let checkbox = 'unchecked';
   createMovie(movies, title, checkbox);
   clearValue(input);
   recLS('movies', movies);
   showMovieList();
}

// Создание объекта "фильм"
function createMovie(array, title, checkbox) {
   const movie = {
      title: title,
      checkbox: checkbox,
   }
   array.unshift(movie);
   return movie;
};

// Очищение поля input
function clearValue(element) {
   element.value = null;
};

// Проверка массива
function checkArray(key, array) {
   if (!LS.getItem(key) == []) {movies = readLS(key)}
   else {array = []}
   return array;
};

// Отрисовка movieList
// function renderMovieList(array) {
//    let movieListHTML = '';
   
//    for (let i = 0; i < array.length; i++) {
//       movieListHTML += `
//          <li id="${i}" class="film">
//             <label class="film__inner">
//                <input id="${i}" class="film__checkbox" type="checkbox" ${array[i].checkbox}>
//                <span class="fake__checkbox"></span>
//                <span class="film__name">${array[i].title}</span>
//             </label>
//             <div id="${i}" class="film__btn" title="Удалить"></div>
//          </li>
//       `
//    }
//    movieList.innerHTML = movieListHTML;
// };

// Отрисовка movieList
function renderMovieList(array) {
   movieList.innerHTML = '';
   for (let i = 0; i < array.length; i++) {

      let li = document.createElement('li');
      li.className = 'film';
      li.setAttribute('id', i);
      movieList.appendChild(li);

      let label = document.createElement('label')
      label.classList = 'film__inner';
      li.appendChild(label);

      let input = document.createElement('input');
      input.className = 'film__checkbox';
      input.setAttribute('id', i);
      input.setAttribute('type', 'checkbox');
      input.setAttribute(`${array[i].checkbox}`, '')
      input.addEventListener('click', () => {
         if (array[event.target.id].checkbox === 'unchecked') {array[event.target.id].checkbox = 'checked'}
         else {array[event.target.id].checkbox = 'unchecked'}
         recLS(MOVIES_STORAGE_LABEL, array)
      })
      label.appendChild(input);
      
      let span = document.createElement('span')
      span.className = 'fake__checkbox';
      label.appendChild(span);

      let spanText = document.createElement('span')
      spanText.className = 'film__name';
      spanText.innerHTML = `${array[i].title}`;
      label.appendChild(spanText);

      let div = document.createElement('div');
      div.className = 'film__btn';
      div.setAttribute('id', i)
      div.setAttribute('title', 'Удалить');
      div.addEventListener('click', () => {
         array.splice(event.target.id,1)
         recLS(MOVIES_STORAGE_LABEL, array);
         renderMovieList(array);
      })
      li.appendChild(div);
   }
};

// Вывод movieList
function showMovieList() {
   checkArray('movies', movies)
   renderMovieList(movies)
};

// Запись данных в localStorage
function recLS(key, value) {
   return LS.setItem(key, JSON.stringify(value))
};

// Чтение данных в localStorage
function readLS(key) {
   return JSON.parse(LS.getItem(key))
};

// Удаление элемента "Фильм" из списка
function removeObject(arr) {
   arr.splice(event.target.id,1)
}
//-------------------------------------------------------------------------------------------------
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

