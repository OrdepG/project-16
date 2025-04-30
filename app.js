let form = document.querySelector("form");
let input = document.querySelector("input");
let todos = document.querySelector(".todos");

function getTodo(todoObj) {
  let todo = document.createElement("div");
  let textEl = document.createElement("span");

  textEl.innerHTML = todoObj.text;

  if (todoObj.done) {
    textEl.classList.add("done");
  }

  textEl.addEventListener("click", function(){
    textEl.classList.toggle("done");
    toggleTodoStatus(todoObj.text);
  });

  todo.appendChild(textEl);

  let closeEl = document.createElement("span");
  closeEl.innerHTML = "&times;";
  closeEl.classList.add("delete");

  closeEl.addEventListener("click", function () {
    todos.removeChild(todo);
    removeTodoFromLocal(todoObj.text);
  });

  todo.appendChild(closeEl);
  todo.classList.add("todo");
  return todo;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let value = input.value;
  if (!value.trim()) return;

  const todoObj = { text: value, done: false };
  todos.appendChild(getTodo(todoObj));
  saveTodoToLocal(todoObj);
  input.value = "";
});

function saveTodoToLocal(todoObj) {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.push(todoObj);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function loadTodosFromLocal() {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

  savedTodos.forEach(todo => {
    const todoEl = getTodo(todo);
    todos.appendChild(todoEl);
  });
}

function removeTodoFromLocal(text){
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos = savedTodos.filter(todo => todo.text !== text);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function toggleTodoStatus(text) {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos = savedTodos.map(todo =>
    todo.text === text ? { ...todo, done: !todo.done } : todo
  );
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

loadTodosFromLocal();
