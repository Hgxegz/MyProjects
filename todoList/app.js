//this is the file for our js to separate it from the html
console.log('Test');


//SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.filter-todo');
 
//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo); //calls addTodo function if button is called 
todoList.addEventListener('click', deleteCheck); //deletes the todo item
todoFilter.addEventListener('click', filterTodo); 


//FUNCTIONS
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
    //todo DIV 
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create li
    const newTodo = document.createElement('li');
    if(todoInput.value == ""){
        alert("need to put in a task");
    } else {
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //ADD TO DO TO LOCAL STORAGE
        saveLocalTodos(todoInput.value);
        //CHECK MARK BUTTON
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //trash BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("delete-btn");
        todoDiv.appendChild(trashButton);
        //APPEND TO LIST
        todoList.appendChild(todoDiv); //todoList is from the selectors that connects us to the todo-list ul from the html
        //Clear todo input value(text bar)
        todoInput.value = "";
    }
}

function deleteCheck(event){
    const item = event.target;
    //DELETE THE TODO
    if(item.classList[0] ==='delete-btn'){
       const todo = item.parentElement; //this todo the whole todo object since we connect the button to the parent
        //falling animation(but it still stays in html so we need to remove it)
        removeLocalTodos(todo);
       todo.remove();
    }

    //CHECK TODO ITEM
    if(item.classList[0] ==='complete-btn'){
        const todo = item.parentElement; //same thing as the delete item
        todo.classList.toggle("completed");
    }

}

function filterTodo(event){
    const todos = todoList.childNodes; //gets the list of todos
    todos.forEach(function(todo){ //loop to see which option we chose(all, completed uncompleted)
        switch(event.target.value){
            case "all":
                todo.style.display = "flex"; //if they want all then we print all
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex"; //print all that contains completed class
                } else {
                    todo.style.display = "none"; //remove the ones that don't fit the requirements
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    }
    )
}

function saveLocalTodos(todo){ //when we create a todo, we also pass it into local storage so we can close it and save it
    //check if you have stuff inside already
    let todos;
    if(localStorage.getItem("todos") === null){ //if we have no todos then we create an empty array
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); //if we do then we take it back and make it into an array
    }
    todos.push(todo); //pushes todo item into array todos
    localStorage.setItem("todos", JSON.stringify(todos)); //this pushes the array into the local storage
}

function getTodos(){ //this loads in the todos from the local storage so it saves for us next time
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //todo DIV 
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //trash BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("delete-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv); //todoList is from the selectors that connects us to the todo-list ul from the html
    });
}

//we need this function to remove the todos from the array in local storage or else it stays
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText; //of this object, it gets the attribute at index 0 which is the name of the task
    todos.splice(todos.indexOf(todoIndex), 1); //this finds the index where the name is found(the 1 means we want to remove 1 element only)
    localStorage.setItem("todos", JSON.stringify(todos)); //this sets the new local storage values
}