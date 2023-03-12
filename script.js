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
    tareas.forEach( function(option) {
        switch(e.target.value){
            case "all":
                tareas.style.display = "flex";
                break;
            case "completed":
                if(tareas.classList.contains("completed")){
                    tareas.style.display = "flex";
                }else{
                    tareas.style.display = "none";
                }
                break;
            case "incomplete":
                if(!tareas.classList.contains("completed")){
                    tareas.style.display = "flex";
                }else{
                    tareas.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalList(tarea){
    let tareas;
    if(localStorage.getItem("option") === null){
        tareas = [];
    }else{
        tareas = JSON.parse(localStorage.getItem("option"));
    }

    tareas.push(tarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function getLocalTareas(){
    let tareas;
    if(localStorage.getItem("option") === null){
        tareas = [];
    }else{
        tareas = JSON.parse(localStorage.getItem("option"));
    }

    tareas.forEach( function(tarea){
        const taskDiv =  document.createElement("div");
        taskDiv.classList.add("to-do");
        const nuevaTarea = document.createElement("li");
        nuevaTarea.innerText = tarea;
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
