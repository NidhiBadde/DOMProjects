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

    // DOM Load event - events to occer on document when page is refereshed .i.e. it ahouls not wipe away the tasks
  document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event
    form.addEventListener('submit' , addTask);

    // Remove task event
    taskList.addEventListener('click' , removeTask);

    // Clear all tasks
    clearBtn.addEventListener('click' , clearTasks);

    // Filter task
    filter.addEventListener('keyup' , filterTasks);
}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
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

    // Add or stor to local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear the input 
    taskInput.value = '';


    e.preventDefault();
}

// Store Task to Local Storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks' , JSON.stringify(tasks));
    
}


// Remove task

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){

        if(confirm('Do you want task to be deleted'))
        e.target.parentElement.parentElement.remove();

        // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Remove from LocalStorage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

// Clear all tasks

function clearTasks() {    
    
    // taskList.innerHTML = '';

    // Faster

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from Local Storage
    clearTasksFromLocalStorage();
}

// Clear from Local Storage
function clearTasksFromLocalStorage()
{
    localStorage.clear();
}

// Filter tasks
function filterTasks(e) {

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
                    task.style.display = 'block';
                  } else {
                    task.style.display = 'none';
                  }
        
    });
    
}

