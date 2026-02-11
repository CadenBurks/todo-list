import "./styles/style.css";
import { createTodo, TodoList } from "./todo.js";
import { addListToPage, renderList } from "./dom.js";


const todoListsMap = new Map();
let currentList = null;
const sortMap = {
    priority: () => currentList.sortByPriority(),
    title: () => currentList.sortByTitle(),
    due: () => currentList.sortByDueDate(),
    created: () => currentList.sortByDateCreated()
};
const sortMapRev = {
    priority: () => currentList.sortByPriorityReverse(),
    title: () => currentList.sortByTitleReverse(),
    due: () => currentList.sortByDueDateReverse(),
    created: () => currentList.sortByDateCreatedReverse()
};

const addList = document.querySelector("#add-list");
const sideContent = document.querySelector(".sidebar-content");
const todoLists = document.querySelector("#todo-lists");
const dialog = document.querySelector(".new-item-form");
const form = document.querySelector(".todo-item-form");

// Default list
document.addEventListener("DOMContentLoaded", () => {
  addListToPage(todoLists, todoListsMap, "Default List", [
    createTodo("Default 1", "This is a default item", new Date(), 1),
    createTodo("Default 2", "This is a default item", new Date(), 2),
    createTodo("Default 3", "This is a default item", new Date(), 3)
  ]);
});

// Adding new list to page
addList.addEventListener("click", () => addListToPage(todoLists, todoListsMap));

// Adding new todo item to a list
sideContent.addEventListener("click", (event) => {
    const button = event.target.closest(".add-item");
    if (!button) { return };

    currentList = button.closest(".todo-list");
    dialog.showModal();
});

// Form for a todo item
form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!currentList) { return };
    
    const formData = new FormData(form);

    const title = formData.get("todoTitle");
    const desc = formData.get("todoDesc");
    const due = formData.get("todoDue");
    const dueString = formData.get("todoDue");
    const dueDate = dueString ? new Date(dueString + "T00:00") : null;
    const priority = formData.get("prior");

    const menu = currentList.querySelector(".todo-menu");
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = title;

    li.appendChild(a);
    menu.appendChild(li);

    const list = todoListsMap.get(currentList);
    list.addToList(createTodo(title, desc, dueDate, priority));

    form.reset();
    dialog.close();
    currentList = null;
});

// Filter options toggle
sideContent.addEventListener("mouseover", (event) => {
  const wrapper = event.target.closest(".filter-section");
  if (!wrapper) return;

  clearTimeout(wrapper._closeTimer);
  wrapper.classList.add("open");
});

// Filter options toggle
sideContent.addEventListener("mouseout", (event) => {
  const wrapper = event.target.closest(".filter-section");
  if (!wrapper) return;

  wrapper._closeTimer = setTimeout(() => {
    wrapper.classList.remove("open");
  }, 200);
});

// Change sort direction
sideContent.addEventListener("click", (event) => {
  const arrow = event.target.closest(".arrow");
  if (!arrow) return;

  const isAsc = arrow.dataset.order === "asc";

  arrow.dataset.order = isAsc ? "desc" : "asc";
  arrow.textContent = isAsc ? "↓" : "↑";
});

// Sort list
sideContent.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-sort]");
  if (!btn) return;

  const listEl = btn.closest(".todo-list");
  const todoList = todoListsMap.get(listEl);

  const arrow = listEl.querySelector(".arrow");
  const order = arrow.dataset.order;
  const sortType = btn.dataset.sort;

  currentList = todoList;

  if (order === "asc") {
    sortMap[sortType]();
  } else {
    sortMapRev[sortType]();
  }

  renderList(todoList, listEl.querySelector(".todo-menu"));
});
