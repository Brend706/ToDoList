const taskInput = document.querySelector(".task-input");
const addButton = document.querySelector(".add-button");
const lista = document.querySelector(".tareas");
const filtro = document.querySelector(".filtro-tareas");

document.addEventListener("DOMContentLoaded", getLocalTareas);
addButton.addEventListener("click", addTarea);
lista.addEventListener("click", deleteCheck);
filtro.addEventListener("change", filtrar);

function addTarea(event){
    event.preventDefault();
    const listDiv = document.createElement("div");
    listDiv.classList.add("to-do");
    const newTask = document.createElement("li");
    newTask.innerText = taskInput.value;
    newTask.classList.add("tarea");
    listDiv.appendChild(newTask);
    //Agregar al historial local
    saveLocalList(taskInput.value);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add("complete-btn");
    listDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    listDiv.appendChild(trashButton);

    lista.appendChild(listDiv);
    taskInput.value = "";
}

function deleteCheck(e){
    const item = e.target;

    if(item.classList[0] === "trash-btn"){
        const task = item.parentElement;
        task.classList.add("slide");

        removeLocalList(task);
        task.addEventListener("transitioned", function(){
            task.remove();
        });
    }

    if(item.classList[0] === "complete-btn"){
        const task = item.parentElement;
        task.classList.toggle("completed");
    }
}

function filtrar(e){
    const tareas = lista.childNodes;

    //NO FUNCIONA :(
    tareas.forEach(function(todo) {
        switch(e.target.value) {
            case "all": 
                todo.style.display = "flex";
                break;
            case "completed": 
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalList(task){
    let tareas;
    if(localStorage.getItem("todos") === null){
        tareas = [];
    }else{
        tareas = JSON.parse(localStorage.getItem("todos"));
    }

    tareas.push(task);
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function getLocalTareas(){
    let tareas;
    if(localStorage.getItem("todos") === null){
        tareas = [];
    }else{
        tareas = JSON.parse(localStorage.getItem("todos"));
    }

    tareas.forEach( function(task){
        const taskDiv =  document.createElement("div");
        taskDiv.classList.add("to-do");
        const nuevaTarea = document.createElement("li");
        nuevaTarea.innerText = task;
        nuevaTarea.classList.add("tarea");
        taskDiv.appendChild(nuevaTarea);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completedButton.classList.add("complete-btn");
        taskDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        taskDiv.appendChild(trashButton);

        lista.appendChild(taskDiv);
    });
}

function removeLocalList(tarea){
    let tareas;
    if(localStorage.getItem("options") === null){
        tareas = [];
    }else{
        tareas = JSON.parse(localStorage.getItem("options"));
    }

    const listaIndex = tarea.children[0].innerText;
    tareas.splice(tareas.indexOf(listaIndex), 1);
    localStorage.setItem("options", JSON.stringify(tareas));
}
