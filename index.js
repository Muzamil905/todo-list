let input = document.getElementById('input');
let form = document.getElementById("todo");
let submit = document.getElementById('submit');
let elementDiv = document.getElementById('elementDiv');
let taskArray = [];


function render() {
    elementDiv.innerHTML = "";

    taskArray.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add("newElementDiv");
        taskElement.setAttribute("id", task.id);

        if (task.done) {
            taskElement.innerHTML = `
                <span id="TaskTodo" style="text-decoration: line-through;"> ${task.ToDo} </span>
                <span><button class='undoneBtn'>Un-done</button></span>
            `;
        } else {
            taskElement.innerHTML = `
                <span id="TaskTodo">${task.ToDo}</span>
                <span class="btnGroup">
                    <button class='edit'>Edit</button>
                    <button class='delete'>Delete</button>
                    <button class='done'>Done</button>
                </span>
            `;
        }

        elementDiv.appendChild(taskElement);
    });
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    let inputValue = input.value.trim();
    if(inputValue === ""){return};
    let taskObject = {id : taskArray.length + 1, ToDo : inputValue,  done : false};
    taskArray.push(taskObject);
    localStorage.setItem('task', JSON.stringify(taskArray));
    input.value = "";
    render();
})

elementDiv.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        let selectedTask = event.target.closest(".newElementDiv");
        let selectedID = parseInt(selectedTask.getAttribute("id"));
        taskArray = taskArray.filter(task => task.id !== selectedID);
        localStorage.setItem('task', JSON.stringify(taskArray));
        render();
    }

    if (event.target.classList.contains("edit")) {
        let doneTask = event.target.closest(".newElementDiv");
        doneTask.classList.toggle('hide');
        let editDiv = document.createElement('div');
        editDiv.innerHTML = `
            <input type="text" class="newInputField"> 
            <span class="btnGroup"> 
                <button class="save">Save</button> 
                <button class="discard">Discard</button> 
            </span>`;
        editDiv.classList.add("newElementDiv");
        doneTask.insertAdjacentElement("afterend", editDiv);

        let save = editDiv.querySelector(".save");
        let discard = editDiv.querySelector(".discard");
        let newInputField = editDiv.querySelector(".newInputField");

        save.addEventListener('click', () => {
            let newInput = newInputField.value.trim();
            if (newInput === "") {
                alert("Please enter a task first");
                newInputField.focus();
                return;
            }

            let TaskTodo = doneTask.querySelector("#TaskTodo");
            TaskTodo.textContent = newInput;

            let selectedID = parseInt(doneTask.getAttribute("id"));
            let task = taskArray.find(t => t.id === selectedID);
            if (task) task.ToDo = newInput;

            localStorage.setItem("task", JSON.stringify(taskArray));
            editDiv.remove();
            doneTask.classList.remove('hide');
            render();
        });

        discard.addEventListener('click', () => {
            editDiv.remove();
            doneTask.classList.remove('hide');
        });
    }

    if (event.target.classList.contains('done')) {
    let selectedTask = event.target.closest(".newElementDiv");
    let selectedID = parseInt(selectedTask.getAttribute('id'));
    let task = taskArray.find(t => t.id === selectedID);
    Toastify({
        text: "Task Done",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "center", 
        stopOnFocus: true, 
        style: { background: "linear-gradient(to right, #00b09b, #96c93d)",},
        onClick: function(){} 
        }).showToast();
        if (task) task.done = true;
        localStorage.setItem('task', JSON.stringify(taskArray));
        render();
    }

    if (event.target.classList.contains('undoneBtn')) {
        let selectedTask = event.target.closest(".newElementDiv");
        let selectedID = parseInt(selectedTask.getAttribute('id'));
        let task = taskArray.find(t => t.id === selectedID);
        Toastify({
        text: "Task not completed",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", 
        position: "center", 
        stopOnFocus: true, 
        style: { background: "linear-gradient(to right, #00b09b, #96c93d)",},
        onClick: function(){} 
        }).showToast();
        if (task) task.done = false;
        localStorage.setItem('task', JSON.stringify(taskArray));
        render();
    }
});


let savedTask = JSON.parse(localStorage.getItem("task")) || [];
if(savedTask){
    taskArray = savedTask;
    render();
}
