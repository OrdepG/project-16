let form = document.querySelector("form");
let input = document.querySelector("input");
let todos = document.querySelector(".todos");

function getTodo(todoObj) {
  // Creating New Elements
  let todo = document.createElement("div");
  let textEl = document.createElement("span");

  // Setting values & Styles
  textEl.innerHTML = todoObj.text;

  if (todoObj.done) {
    textEl.classList.add("done");
  }

  textEl.addEventListener("click", function(){
    textEl.classList.toggle("done");
    toggleTodoStatus(todoObj.text);
  });
  // Appending Our Element To The DOM
  todo.appendChild(textEl);

  let closeEl = document.createElement("span");
  closeEl.innerHTML = "&times;";
  closeEl.classList.add("delete");

  // Attaching Events
  closeEl.addEventListener("click", function (e) {
    todos.removeChild(todo);
    removeTodoFromLocal(todoObj.text);
  });

  todo.appendChild(closeEl);
  todo.classList.add("todo");
  return todo;
}

form.addEventListener("submit", (e) => {
  // preventing the default behavior
  e.preventDefault();
  let value = input.value;
  if (!value.trim()) return;

  const todoObj = { text: value, done: false};
  todos.appendChild(getTodo(todoObj));

  saveTodoToLocal(todoObj)
  input.value = "";
});
 
function saveTodoToLocal(todoObj) {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) ||  [];
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

loadTodosFromLocal();

function removeTodoFromLocal(text){
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos = savedTodos.filter(todo => todo !== text);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function toggleTodoStatus(text) {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos = savedTodos.map(todo =>
    todo.text === text ? { ...todo, done: !todo.done} : todo
  );
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}
