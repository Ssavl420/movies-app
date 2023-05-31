const movieNameNode = document.querySelector('#movieTitle')
const addMovieBtn = document.querySelector('#movieBtn')

const removeFilm = document.querySelector('.film__btn') // ????

const movieList = document.querySelector('#listFilms')

const title = movieNameNode.value;

const empty = ""
let moviesArray = []

init()
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

// Сделать function через стрелочную функцию!

function init() {
   moviesArray = JSON.parse(localStorage.getItem('moviesArray'));
   if (!JSON.parse(localStorage.getItem('moviesArray')) == []) {
      showMovieList(JSON.parse(localStorage.getItem('moviesArray')));
   }
   return null;
}


// function createMovie(title, checkbox) {
//    const movie = {
//    title: title,
//    checkbox: checkbox,
//    }
//    moviesArray.push(movie);
//    return movie;
// };
// console.log(createMovie('Жара', 'false'));
// console.log(moviesArray);


function addMovieToList(e) {
   e.preventDefault();

   if (!JSON.parse(localStorage.getItem('moviesArray')) == []) {
      moviesArray = JSON.parse(localStorage.getItem('moviesArray'));
   } else {
      moviesArray = [];
   }

   // const name = movieNameNode.value;
   // let checkbox = unchecked;
   // const movie = {
   //    name: movieNameNode.value,
   //    checkbox: unchecked,
   // }

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





// простенький класс, для упрощения сохранения 
  // и чтения массивов объектов в localStorage
   // class Stogage {
      // constructor(name) {
      // конструктор. создает в localStorage 
      // именованное хранилище

      // запоминаем название именованного хранилища
      // this.name = name;

      // создаем ассоциативный массив в котором для
      // быстрого доступа будут кэшироваться объекты
      // сохраняемые в именованном хранилище
      // this.hash = {};

      // если в localStorage уже есть данные 
      // сохраненые под ключем с именем this.name
      // то считываем их в this.hash
      // let text = localStorage.getItem(this.name);
      //    if (text)
      //       this.hash = JSON.parse(text);

      // сохраняем ассоциативный массив this.hash в
      // localStorage под именем this.name 
   //    this.save();
   // }

   // get(id) {
      // получить значение по его id из именованного хранилища 
      // с именем this.name
   //    return this.item.find(item => item.id === id)
   // }

   // add(id, data) {
      // сохранить значение по его id в именованном хранилище
      // с именем this.name
   //    this.hash[id] = data;
   //    this.save();
   // }

   // del(id) {
      // удалить значение по его id в именованном хранилище
      // с именем this.name
   //    delete this.hash[id];
   //    this.save();
   // }

   // save() {
      // преобразуем ассоциативный массив this.hash в массив list
      // this.list = Object.values(this.hash);

      // преобразуем массив list в строку text
      // const text = JSON.stringify(this.hash);

      // сохраняем строку text в localStorage под
      // именем this.name
//       localStorage.setItem(this.name, text);
//    }

// }




// создаем объект класса Stogage для хранения данных о состоянии checkbox-в в localStorage
// const checkbox_store = new Stogage('checkbox_store');


// восстанавливает состояния checkbox-в сохраненные в localstorage checkbox_store
// checkbox_store.list.forEach(item => {
   // если есть такой элемент, выставляем ему запомненное состояние
   // if (item.state === "on"){
   //    return document.querySelector('#' + item.id).checked = item.state;
     // return $('#' + item.id).prop('checked', item.state);
//    }

//    checkbox_store.del(item.id);
// });


// устанавливаем обработчик для фиксации изменения состояния checkbox-в с классом check
// function changeHandler(event) {
//    let id = event.currentTarget.id;
//    let state = event.currentTarget.checked ? "on" : undefined;
//    checkbox_store.add(id, {
//       id: id,
//       state: state
//    });
// };

// document.querySelectorAll('.film__checkbox').forEach(function (item) {
//    item.addEventListener("change", changeHandler);
// });