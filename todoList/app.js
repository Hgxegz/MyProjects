//this is the file for our js to separate it from the html
console.log('Test');


//SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//EVENT LISTENERS
todoButton.addEventListener('click', addTodo); //calls addTodo function if button is called

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