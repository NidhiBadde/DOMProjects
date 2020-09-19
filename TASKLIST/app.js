// Define UI vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listerner
loadEventListerner();

// Load all event listerner

function loadEventListerner(){

    // Add task event
    form.addEventListener('submit' , addTask);
}

// Add Task

function addTask(e) {


    if(taskInput.value === ''){
        alert('Enter a task to add');
    }

    // If we have task to be added we need to create a li for that

    const li =document.createElement('li');

    // Add class - because in materialze if we need UI to look good then ul should have class collection and its li should have class named collection-item
    li.className = 'collection-item';

    // add task to list -  create text node and append to li 
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    // add deletet icon to list

    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Clear the input 
    taskInput.value = '';


    e.preventDefault();
}