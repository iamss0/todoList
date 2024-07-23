// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listerners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);




// Funstions
function addTodo(event){
    //prevent form form submitting
    event.preventDefault();
    //ToDo DIV
    const todoDIV = document.createElement('div');
    todoDIV.classList.add('todo');
    //create List items
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDIV.appendChild(newTodo);
    //add todo to local storage
    saveLocalTodos(todoInput.value);
    //check button
    const completedButton = document.createElement('Button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDIV.appendChild(completedButton);
    //delete button
    const trashButton = document.createElement('Button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDIV.appendChild(trashButton);
    //Append to List
    todoList.appendChild(todoDIV);
    //clear todo INPUT VALUE
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    //delete TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
         //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //check todo
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed"); 
    }

}


//selct krnek liye ek function bnaya jayega
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
                

        }
    });
}

function saveLocalTodos(todo){
    //hey do i alreday have things in there

    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    //hey do i alreday have things in there

    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //ToDo DIV
    const todoDIV = document.createElement('div');
    todoDIV.classList.add('todo');
    //create List items
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDIV.appendChild(newTodo);

    //check button
    const completedButton = document.createElement('Button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDIV.appendChild(completedButton);
    //delete button
    const trashButton = document.createElement('Button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDIV.appendChild(trashButton);
    //Append to List
    todoList.appendChild(todoDIV);
    });
}

function removeLocalTodos(todo){
    //hey do i alreday have things in there

    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}