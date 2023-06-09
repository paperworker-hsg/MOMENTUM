const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.currentTarget.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  const divHeader = document.createElement("div");
  divHeader.classList.add("collapsible-header");
  divHeader.textContent = "To Do List";
  0;
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerHTML = `${newTodo.text} `;
  const button = document.createElement("button");
  button.innerHTML = `<i class='tiny material-icons delete'>delete</i>`;
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

document.addEventListener("DOMContentLoaded", function () {
  const elems = document.querySelectorAll(".collapsible");

  const instances = M.Collapsible.init(elems, {
    onOpenStart: function (el) {},
  });
});
