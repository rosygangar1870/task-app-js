//Define UI Variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load all event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners() {
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add task event
    form.addEventListener('submit', addTask);

    //Remove task event
    taskList.addEventListener('click',removeTask);

    //Clear task event
    clearBtn.addEventListener('click', clearTasks);

    //Filter task event
    filter.addEventListener('keyup', filterTasks);

}

//Get TASKS from ls
function getTasks(e) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
        //empty array
    } else {
        //get whatever is stoed in local storage
        //local storage can only store strings
        //so we are going to parse it as json when it comes out
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //loop through these tasks
    tasks.forEach(function(task) {
    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create a text note and append to the li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML='<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
    })
}

//Add task
function addTask(e) {
    //If nothing is inputed in the task
    if(taskInput.value === '') {
        alert('Add a task');
    }

    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create a text note and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML='<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //Store in LS
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value='';
    e.preventDefault();
}

//StoreTask
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
        //empty array
    } else {
        //get whatever is stoed in local storage
        //local storage can only store strings
        //so we are going to parse it as json when it comes out
        tasks = JSON.parse(localStorage.getItem('tasks'));
}
tasks.push(task);//push on to that variable

//send it back to the local storage
//need to be stored as string
localStorage.setItem('tasks', JSON.stringify(tasks));
}



//Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
        //empty array
    } else {
        //get whatever is stoed in local storage
        //local storage can only store strings
        //so we are going to parse it as json when it comes out
        tasks = JSON.parse(localStorage.getItem('tasks'));
}
   tasks.forEach(function(task, index){
       if(taskItem.textContent === task) {
           tasks.splice(index,1);
       }
   });

   localStorage.setItem('tasks', JSON.stringify(tasks));

   
}

//Clear Tasks
function clearTasks(e) {
    //first way taskList.innerHTML = '';

    //second way - faster
    //loop through and remove child
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from LS
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();//give value of whatever is typed

    
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;

        //if no match it would be equal to -1
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
    
}