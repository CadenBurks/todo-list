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

export function createTodo(todoTitle, todoDesc, dueDate, todoPrior) {
    let _title = todoTitle;
    let _desc = todoDesc;
    let _due = dueDate instanceof Date ? dueDate : dueDate ? new Date(dueDate + "T00:00") : null;
    let _priority = todoPrior;
    const id = crypto.randomUUID();
    const dateCreated = new Date();
    let _completed  = false;

    function updateTitle(newTitle) { _title = newTitle; }
    
    function getTitle() { return _title; }

    function updateDesc (newDesc) { _desc = newDesc; }

    function getDesc() { return _desc; }

    function updateDueDate(newDate) { _due = newDate instanceof Date ? newDate : newDate ? new Date(newDate + "T00:00") : null; }

    function getDueDate() { return _due; }

    function updatePriority(newPrior) { _priority = newPrior; }

    function getPriority() { return _priority; }

    function toggle() { _completed = !_completed; }

    function isComplete() { return _completed; }

    return { id, dateCreated, updateTitle, getTitle, updateDesc, getDesc, updateDueDate, getDueDate, updatePriority, getPriority, toggle, isComplete };
}

export class TodoList {
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
        this.todos.sort((a, b) => a.getTitle().localeCompare(b.getTitle()));
        Logger.log(this.todos.map(todo => `${todo.getTitle()} [${todo.getPriority()}]`).join(" | "));
    }

    sortByTitleReverse() {
        this.todos.sort((a, b) => b.getTitle().localeCompare(a.getTitle()));
        Logger.log(this.todos.map(todo => `${todo.getTitle()} [${todo.getPriority()}]`).join(" | "));
    }

    sortByDueDate() {
        this.todos.sort((a, b) => {
        if (!a.getDueDate()) return 1;
        if (!b.getDueDate()) return -1;
        return a.getDueDate() - b.getDueDate();
        });
        Logger.log(this.todos.map(todo => `${todo.getTitle()} [${todo.getPriority()}]`).join(" | "));
    }

    sortByDueDateReverse() {
        this.todos.sort((a, b) => {
        if (!b.getDueDate()) return 1;
        if (!a.getDueDate()) return -1;
        return b.getDueDate() - a.getDueDate();
        });
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
