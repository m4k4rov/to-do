//Выбираем элементы

const clear = document.querySelector(".clear"),
      dateElement = document.getElementById("date"),
      list = document.getElementById("list"),
      input = document.getElementById("input");

//Константы для классов

const CHECK = "fa-check-circle",
      UNCHECK = "fa-circle-thin",
      LINE_THROUGH = "lineThrough";

//Переменные

let LIST, id;

//Получение данных из localstorage

let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
}else {
  LIST = [];
  id = 0;
}

//Функция для загрузки данных из localstorage

function loadList(array) {
  array.forEach(item => {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//Очистка localestorage

clear.addEventListener("click",()=>{
  localStorage.clear();
  location.reload();
})

//Показываем дату

const today = new Date();
let options = {weekday: 'long', month: 'short', day: 'numeric'};
dateElement.innerHTML = today.toLocaleDateString("ru-RU", options);

// Функция добавления задачи

function addToDo(toDo, id, done, trash) {
  if(trash) return;

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  
  const item = `
    <li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}">
  `;
  list.insertAdjacentHTML("beforeend", item);
}

//Добавляем элемент в лист

document.addEventListener("keyup", function(event) {
  if(event.keyCode == 13) {
    const toDo = input.value;
    //Проверяем пустой ли инпут
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });
      //Отправка данных в localstorage
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

//Действия с элементом

function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  LIST[element.id].done = LIST[element.id].done ? false : true;
}

//удаление элемента

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}


list.addEventListener("click", function(event) {
  const element = event.target; //Возвращает элемент по которому кликнули
  const elementJob = element.attributes.job.value;//complete или delete

  if (elementJob == "complete") {
    completeToDo(element);
  } else if(elementJob == "delete") {
    removeToDo(element);
  }
  //Отправка данных в localstorage
  localStorage.setItem("TODO", JSON.stringify(LIST));
});