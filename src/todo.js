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

function createTodo(todoTitle, todoDesc, dueDate) {
    let _title = todoTitle;
    let _desc = todoDesc;
    let _due = dueDate;
    const id = crypto.randomUUID();
    const dateCreated = new Date();
    let _completed  = false;

    function updateTitle(newTitle) { _title = newTitle; }
    
    function getTitle() { return _title; }

    function updateDesc (newDesc) { _desc = newDesc; }

    function getDesc() { return _desc; }

    function getDueDate() { return _due; }

    function toggle() { _completed = !_completed; }

    function isComplete() { return _completed; }

    return { id, dateCreated, updateTitle, getTitle, updateDesc, getDesc, getDueDate, toggle, isComplete };
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
        let output = ""
        for (let todo of this.todos) {
            output += todo.getTitle() + " ";
        }
        console.log(output);
    }
}

const myList = new TodoList("Main");
const chores = new TodoList("Chores");

let todo1 = createTodo("Call landlord", "Washer is broken", new Date());
let todo2 = createTodo("Laundry", "Go to laundromat", new Date());

myList.addToList(todo1);
chores.addToList(todo2);

chores.print();

chores.removeFromList(todo2);
chores.removeFromList(todo1);