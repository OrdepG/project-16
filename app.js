let form = document.querySelector("form");
let input = document.querySelector("input");
let todos = document.querySelector(".todos");

function getTodo(todoObj) {
  let todo = document.createElement("div");
  let textEl = document.createElement("span");
  textEl.classList.add("text");
  textEl.innerHTML = todoObj.text;

  if (todoObj.done) {
    textEl.classList.add("done");
  }

  textEl.addEventListener("click", function () {
    textEl.classList.toggle("done");
    toggleTodoStatus(todoObj.id);
  });

  let editEl = document.createElement("span");
  editEl.innerHTML = '<i class="fas fa-pen"></i>';
  editEl.classList.add("edit");

  editEl.addEventListener("click", function () {
    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = todoObj.text;
    inputEdit.classList.add("edit-input");

    todo.replaceChild(inputEdit, textEl);
    inputEdit.focus();

    function confirmEdit() {
      const newText = inputEdit.value.trim();
      if (!newText) return;

      textEl.innerHTML = newText;
      todoObj.text = newText;

      updateTodoText(todoObj.id, newText);

      todo.replaceChild(textEl, inputEdit);
    }

    inputEdit.addEventListener("blur", confirmEdit);
    inputEdit.addEventListener("keydown", function (e) {
      if (e.key === "Enter") confirmEdit();
    });
  });

  todo.appendChild(textEl);
  todo.appendChild(editEl);

  let closeEl = document.createElement("span");
  closeEl.innerHTML = '<i class="fas fa-times"></i>';
  closeEl.classList.add("delete");

  closeEl.addEventListener("click", function () {
    todo.classList.remove("fade-in");
    todo.classList.add("fade-out");

    setTimeout(() => {
      todos.removeChild(todo);
      removeTodoFromLocal(todoObj.id);
    }, 300);
  });

  todo.appendChild(closeEl);
  todo.classList.add("todo");
  todo.classList.add("fade-in");
  return todo;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let value = input.value;
  if (!value.trim()) return;

  const todoObj = {
    id: crypto.randomUUID(),
    text: value,
    done: false,
  };
  todos.appendChild(getTodo(todoObj));
  saveTodoToLocal(todoObj);
  input.value = "";
});

function updateTodoText(id, newText) {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos = savedTodos.map((todo) =>
    todo.id === id ? { ...todo, text: newText } : todo
  );
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function saveTodoToLocal(todoObj) {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.push(todoObj);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function loadTodosFromLocal() {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

  savedTodos.forEach((todo) => {
    const todoEl = getTodo(todo);
    todos.appendChild(todoEl);
  });
}

function removeTodoFromLocal(id) {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos = savedTodos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function toggleTodoStatus(id) {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos = savedTodos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

loadTodosFromLocal();
