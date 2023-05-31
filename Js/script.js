const movieNameNode = document.querySelector('#movieTitle')
const addMovieBtn = document.querySelector('#movieBtn')

const movieList = document.querySelector('#listFilms')

const empty = ""
let moviesArray = []

init();
addMovieBtn.addEventListener('click', addMovieToList)
addMovieBtn.addEventListener('click', showMovieList)

movieList.addEventListener ('click', (event) => {
   if (event.target.classList.contains('film__checkbox')) {
      console.log('Id:', event.target.id, event.target.checked)

   } else if (event.target.classList.contains('film__btn')) {
      moviesArray.splice(event.target.id,1)
      localStorage.setItem('moviesArray', JSON.stringify(moviesArray))
      showMovieList();
   }
})

function init () {
   moviesArray = JSON.parse(localStorage.getItem('moviesArray'));
   if (!JSON.parse(localStorage.getItem('moviesArray')) == []) {
      showMovieList(JSON.parse(localStorage.getItem('moviesArray')));
   }
   return null;
}

function addMovieToList(e) {
   e.preventDefault();

   if (!JSON.parse(localStorage.getItem('moviesArray')) == []) {
      moviesArray = JSON.parse(localStorage.getItem('moviesArray'));
   } else {
      moviesArray = [];
   }

   const movie = movieNameNode.value;

   if (!movie) {
      return null;
   }
   movieNameNode.value = empty;
   moviesArray.unshift(movie);

   localStorage.setItem('moviesArray', JSON.stringify(moviesArray));
}

function showMovieList() {
   const moviesArray = JSON.parse(localStorage.getItem('moviesArray'))
   let movieListHTML = '';
   
   for (let i = 0; i < moviesArray.length; i++) {
      movieListHTML += `
         <li id="${i}" class="film">
            <label class="film__inner">
               <input id="checkbox-${i}" class="film__checkbox" type="checkbox">
               <span class="fake__checkbox"></span>
               <span class="film__name">${moviesArray[i]}</span>
            </label>
            <div id="${i}" class="film__btn" title="Удалить"></div>
         </li>
      `
   }
   movieList.innerHTML = movieListHTML;
}