function createLogger() {
    function log(message) {
        console.log(message);
    }

    function error(message) {
        console.error(message);
    }

    function warn(message) {
        console.warn(message);
    }

    return { log, error, warn };
}

const Logger = createLogger();

function createTodo(todoTitle, todoDesc, dueDate, todoPrior) {
    let _title = todoTitle;
    let _desc = todoDesc;
    let _due = dueDate;
    let _priority = todoPrior;
    const id = crypto.randomUUID();
    const dateCreated = new Date();
    let _completed  = false;

    function updateTitle(newTitle) { _title = newTitle; }
    
    function getTitle() { return _title; }

    function updateDesc (newDesc) { _desc = newDesc; }

    function getDesc() { return _desc; }

    function updateDueDate(newDate) { _due = newDate; }

    function getDueDate() { return _due; }

    function updatePriority(newPrior) { _priority = newPrior; }

    function getPriority() { return _priority; }

    function toggle() { _completed = !_completed; }

    function isComplete() { return _completed; }

    return { id, dateCreated, updateTitle, getTitle, updateDesc, getDesc, updateDueDate, getDueDate, updatePriority, getPriority, toggle, isComplete };
}

class TodoList {
    constructor(name){
        this.name = name;
        this.todos = [];
        Logger.log(`Created Todo List: '${name}'`);
    }

    addToList(todo) {
        this.todos.push(todo);
        Logger.log(`Added todo item: '${todo.getTitle()}' (${todo.id}) to '${this.name}'`);
    }

    removeFromList(todo) {
        const index = this.todos.findIndex(item => item.id === todo.id);
        if (index !== -1) {
            this.todos.splice(index, 1);
            Logger.log(`Removed todo item: '${todo.getTitle()}' (${todo.id}) from '${this.name}'`);
        }
        else {
            Logger.warn(`Todo item: '${todo.getTitle()}' (${todo.id}) does not exist in '${this.name}'`)
        }
    }

    print() {
        Logger.log(this.todos.map(todo => `${todo.getTitle()} [${todo.getPriority()}]`).join(" | "));
    }

    sortByPriority() {
        this.todos.sort((a, b) => a.getPriority() - b.getPriority());
        Logger.log(this.todos.map(todo => `${todo.getTitle()} [${todo.getPriority()}]`).join(" | "));
    }

    sortByPriorityReverse() {
        this.todos.sort((a, b) => b.getPriority() - a.getPriority());
        Logger.log(this.todos.map(todo => `${todo.getTitle()} [${todo.getPriority()}]`).join(" | "));
    }

    sortByTitle() {
        this.todos.sort((a, b) => a.getTitle() > b.getTitle() ? 1 : -1);
        Logger.log(this.todos.map(todo => `${todo.getTitle()} [${todo.getPriority()}]`).join(" | "));
    }

    sortByTitleReverse() {
        this.todos.sort((a, b) => b.getTitle() > a.getTitle() ? 1 : -1);
        Logger.log(this.todos.map(todo => `${todo.getTitle()} [${todo.getPriority()}]`).join(" | "));
    }

    sortByDueDate() {
        this.todos.sort((a, b) => a.getDueDate() - b.getDueDate());
        Logger.log(this.todos.map(todo => `${todo.getTitle()} [${todo.getPriority()}]`).join(" | "));
    }

    sortByDueDateReverse() {
        this.todos.sort((a, b) => b.getDueDate() - a.getDueDate());
        Logger.log(this.todos.map(todo => `${todo.getTitle()} [${todo.getPriority()}]`).join(" | "));
    }

    sortByDateCreated() {
        this.todos.sort((a, b) => a.dateCreated - b.dateCreated);
        Logger.log(this.todos.map(todo => `${todo.getTitle()} [${todo.getPriority()}]`).join(" | "));
    }

    sortByDateCreatedReverse() {
        this.todos.sort((a, b) => b.dateCreated - a.dateCreated);
        Logger.log(this.todos.map(todo => `${todo.getTitle()} [${todo.getPriority()}]`).join(" | "));
    }
}

const myList = new TodoList("Main");
const chores = new TodoList("Chores");

let todo1 = createTodo("Call landlord", "Washer is broken", new Date(2025, 1, 1), 3);
let todo2 = createTodo("Laundry", "Go to laundromat", new Date(2025, 1, 2), 2);
let todo3 = createTodo("Dishes", "Do the dishes", new Date(2024, 12, 2), 1);

myList.addToList(todo1);
myList.addToList(todo2);
myList.addToList(todo3);
myList.print();