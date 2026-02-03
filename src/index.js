import "./styles/style.css";
import { createTodo, TodoList } from "./todo.js";


const todoListsMap = new Map();
let currentList = null;

const addList = document.querySelector("#add-list");
const sideContent = document.querySelector(".sidebar-content");
const todoLists = document.querySelector("#todo-lists");
const dialog = document.querySelector(".new-item-form");
const form = document.querySelector(".todo-item-form");

// Adding new list to page
addList.addEventListener("click", () => {
    const listName = prompt("Name of the new list: ");
    if (!listName) { return };
    
    const list = document.createElement("li");
    list.classList.add("todo-list");

    const todoHeader = document.createElement("div");
    todoHeader.classList.add("todo-header");

    const addItemBtn = document.createElement("button");
    addItemBtn.classList.add("add-item");
    addItemBtn.textContent = "╋";

    const sortBtn = document.createElement("button");
    sortBtn.classList.add("sort");
    sortBtn.textContent = "☰";

    const listTitle = document.createElement("a");
    listTitle.href = "#";
    listTitle.textContent = listName;

    const todoMenu = document.createElement("ul");
    todoMenu.classList.add("todo-menu");

    todoHeader.appendChild(listTitle);
    todoHeader.appendChild(addItemBtn);
    todoHeader.appendChild(sortBtn);
    list.appendChild(todoHeader);
    list.appendChild(todoMenu);
    todoLists.appendChild(list);

    const todoList = new TodoList(listName);
    todoListsMap.set(list, todoList);
});

// Adding new todo item to a list
sideContent.addEventListener("click", (event) => {
    const button = event.target.closest(".add-item");
    if (!button) { return };

    currentList = button.closest(".todo-list");
    dialog.showModal();
});

// Sorting a todo list
sideContent.addEventListener("click", (event) => {
    const button = event.target.closest(".sort");
    if (!button) { return };

    const list = button.closest(".todo-list");
    const todoList = todoListsMap.get(list);
    
    todoList.sortByPriority();

    renderList(todoList, list.querySelector(".todo-menu"));
});

// Form for a todo item
form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!currentList) { return };
    
    const formData = new FormData(form);

    const title = formData.get("todoTitle");
    const desc = formData.get("todoDesc");
    const due = formData.get("todoDue");
    const priority = formData.get("prior");

    const menu = currentList.querySelector(".todo-menu");
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = title;

    li.appendChild(a);
    menu.appendChild(li);

    const list = todoListsMap.get(currentList);
    list.addToList(createTodo(title, desc, due, priority));

    form.reset();
    dialog.close();
    currentList = null;
});

function renderList(todoList, ul) {
    ul.innerHTML = "";

    todoList.todos.forEach(todo => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = "#";
        a.textContent = `${todo.getTitle()}`;

        li.appendChild(a);
        ul.appendChild(li);
    });
}