const input = document.querySelector('#movieTitle');
const movieList = document.querySelector('#listFilms')

const addMovie = document.querySelector('#addMovie')

const LS = localStorage;
const MOVIES_STORAGE_LABEL = 'movies';

let movies = [];

//=======================================================================================

addMovie.addEventListener('submit', addMovieHandler)

renderMovieList();
//=======================================================================================

// Валидация формы (инпут)
function validation(form) {

   function createError(input, text) {
      const parent = input.parentNode;
      const errorLabel = document.createElement('label');

      errorLabel.classList.add('error__label');
      errorLabel.innerText = text;
      parent.appendChild(errorLabel);
      parent.classList.add('error');
   }
   function removeError(input) {
      const parent = input.parentNode;
      if (parent.classList.contains('error')) {
         parent.querySelector('.error__label').remove()
         parent.classList.remove('error')
      }
   }

   let result = true;

   const allInputs = form.querySelectorAll('input');
   const pattern = /[^а-яА-ЯёЁa-zA-Z0-9\s]\.\,\:\!\?\(\)\/]+/g;

   for (const input of allInputs) {
      removeError(input);
      if(input.value == "") {
         createError(input, 'Поле не заполнено')
         result = false;
      }
      if(!input.value == "" && input.value.trim() == "") {
         createError(input, 'Пробел, не фильм')
         clearValue(input)
         result = false;
      }
      if(!input.value == "" && pattern.test(input.value)) {
         createError(input, 'Недопустимые символы')
         clearValue(input)
         result = false;
      }
   }
   return result;
} 

// Запуск: чтение инпута, создание объекта, запись в LS, показ данных
function addMovieHandler(event) {
   event.preventDefault();

   if (validation(this) == false) {
      input.focus();
      return null;
   }

   const title = input.value;
   let checkboxValue = 'unchecked';

   createMovie(title, checkboxValue);
   clearValue(input);
   recLS(MOVIES_STORAGE_LABEL, movies);
   renderMovieList();
   input.focus();
}

// Вывод movieList
function renderMovieList() {
   input.focus();
   getMoviesArray(MOVIES_STORAGE_LABEL, movies)
   renderMovieItem()
};

// Получение массива
function getMoviesArray(key, array) {
   if (!LS.getItem(key) == []) {movies = readLS(key)}
   else {array = []}
   return array;
};

// Отрисовка movieItem
function renderMovieItem() {
   movieList.innerHTML = '';
   for (let i = 0; i < movies.length; i++) {


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
      filmCheckbox.setAttribute(`${movies[i].checkboxValue}`, '');
      filmBtn.setAttribute('id', i);
      filmBtn.setAttribute('title', 'Удалить');

      movieList.appendChild(film);
      film.appendChild(filmInner);
      filmInner.appendChild(filmCheckbox);
      filmInner.appendChild(fakeCheckbox);
      filmInner.appendChild(filmName);
      film.appendChild(filmBtn);

      filmName.innerHTML = `${movies[i].title}`;
      
      filmCheckbox.addEventListener('click', () => {
         if (movies[i].checkboxValue === 'unchecked') {movies[i].checkboxValue = 'checked'}
         else {movies[i].checkboxValue = 'unchecked'}
         recLS(MOVIES_STORAGE_LABEL, movies)
      })
      
      filmBtn.addEventListener('click', () => {
         removeFilm(i);
         recLS(MOVIES_STORAGE_LABEL, movies);
         renderMovieItem();
      })
   }
};

// Создание объекта "фильм"
function createMovie(title, checkboxValue) {
   const movie = {
      title: title,
      checkboxValue: checkboxValue,
   }
   movies.unshift(movie);
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
function removeFilm(i) {
   movies.splice(i,1)
}
//-------------------------------------------------------------------------------------------------
