import "./styles/style.css";
import { createTodo, TodoList } from "./todo.js";


const todoListsMap = new Map();

const addList = document.querySelector("#add-list");
const sideContent = document.querySelector(".sidebar-content");
const todoLists = document.querySelector("#todo-lists");

// Dropdown toggling
sideContent.addEventListener("click", (event) => {
  const toggle = event.target.closest(".dropdown-toggle");
  if (!toggle) return;

  event.preventDefault();
  const dropdown = toggle.closest(".dropdown");
  dropdown.classList.toggle("open");
});

// Adding new list to page
addList.addEventListener("click", () => {
    const listName = prompt("Name of the new list: ");
    if (!listName) { return };
    
    const dropdown = document.createElement("li");
    dropdown.classList.add("dropdown");

    const dropHeader = document.createElement("div");
    dropHeader.classList.add("dropdown-header");

    const addItemBtn = document.createElement("button");
    addItemBtn.classList.add("add-item");
    addItemBtn.textContent = "Add Item";

    const dropToggle = document.createElement("a");
    dropToggle.href = "#";
    dropToggle.classList.add("dropdown-toggle");
    dropToggle.textContent = `${listName} ▾`;

    const dropMenu = document.createElement("ul");
    dropMenu.classList.add("dropdown-menu");

    dropHeader.appendChild(dropToggle);
    dropHeader.appendChild(addItemBtn);
    dropdown.appendChild(dropHeader);
    dropdown.appendChild(dropMenu);
    todoLists.appendChild(dropdown);

    const todoList = new TodoList(listName);
    todoListsMap.set(dropdown, todoList);
});

// Adding new todo item to a list
sideContent.addEventListener("click", (event) => {
    const button = event.target.closest(".add-item");
    if (!button) { return };

    const itemName = prompt("Title of the new item: ");
    if (!itemName) { return };

    const dropdown = button.closest(".dropdown");
    const currList = todoListsMap.get(dropdown);
    currList.print();
    
    const dropMenu = dropdown.querySelector(".dropdown-menu");
    const li = document.createElement("li");
    const newItem = document.createElement("a");
    newItem.href="#";
    newItem.textContent = itemName;
    li.appendChild(newItem);
    dropMenu.appendChild(li);
});