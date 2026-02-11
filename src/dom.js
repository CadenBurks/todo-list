import { TodoList } from "./todo.js";

const options = {priority: "Priority", title: "Title", due: "Due Date", created: "Created"};
const priorityBorders = ["green", "yellow", "red"];
const priorityBackgrounds = ["rgba(46, 204, 113, 0.2)", "rgba(230, 126, 34, 0.2)", "rgba(231, 76, 60, 0.2)"];

export function addListToPage(todoLists, todoListsMap, defaultList="", defaultItems = []){
    let listName = "";
    if (defaultList) {
        listName = defaultList;
    }
    else {
        listName = prompt("Name of the new list: ");
    }
    if (!listName) { return };
    
    const list = document.createElement("li");
    list.classList.add("todo-list");

    const todoHeader = document.createElement("div");
    todoHeader.classList.add("todo-header");

    const addItemBtn = document.createElement("button");
    addItemBtn.classList.add("add-item");
    addItemBtn.textContent = "╋";

    const filterSection = document.createElement("div");
    filterSection.classList.add("filter-section");

    const sortBtn = document.createElement("button");
    sortBtn.classList.add("sort");
    sortBtn.textContent = "☰";

    const filterMenu = document.createElement("ul");
    filterMenu.classList.add("filter-menu");
    const li = document.createElement("li");
    const order = document.createElement("button");
    order.classList.add("arrow");
    order.textContent = "↑";
    order.dataset.order = "asc";
    li.appendChild(order);
    filterMenu.appendChild(li);
    for (const option in options) {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.dataset.sort = option;
        btn.textContent = options[option];
        li.appendChild(btn);
        filterMenu.appendChild(li);
    }

    filterSection.appendChild(sortBtn);
    filterSection.appendChild(filterMenu);

    const listTitle = document.createElement("a");
    listTitle.href = "#";
    listTitle.textContent = listName;

    const todoMenu = document.createElement("ul");
    todoMenu.classList.add("todo-menu");

    todoHeader.appendChild(listTitle);
    todoHeader.appendChild(addItemBtn);
    todoHeader.appendChild(filterSection);
    list.appendChild(todoHeader);
    list.appendChild(todoMenu);
    todoLists.appendChild(list);

    const todoList = new TodoList(listName);
    todoListsMap.set(list, todoList);

    defaultItems.forEach(item => {
    todoList.addToList(item);
    });

    renderList(todoList, todoMenu);
}

export function renderList(todoList, ul) {
    ul.innerHTML = "";

    todoList.todos.forEach(todo => {
        const li = document.createElement("li");
        li.classList.add("priority-color");
        li.style.borderLeftColor = priorityBorders[todo.getPriority() - 1];
        li.style.backgroundColor = priorityBackgrounds[todo.getPriority() - 1];
        
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = `${todo.getTitle()}`;

        li.appendChild(a);
        ul.appendChild(li);
    });
}