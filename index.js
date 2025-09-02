let inputValue = document.getElementById('inputValue');
let submitBTN = document.getElementById("submit");
let elementDiv = document.getElementById('elementDiv');
let arrayOBJ = [];

//Creating BTN and Task and pushing into array of objects
submitBTN.addEventListener('click', ()=>{    
    let task = inputValue.value.trim();
    if(task == ""){
        alert('Please enter the task!');
        return;  
    }

    let object = {
        id: arrayOBJ.length + 1,
        toDo: task,
        inState: false
    };

    let newElementDiv = document.createElement('div');
    newElementDiv.setAttribute('data-id', object.id); 

    newElementDiv.innerHTML = `
        <span class="taskValue">${task}</span>
        <span class="btnGroup">
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
            <button class="doneBtn">Done</button>
        </span>`;
    elementDiv.appendChild(newElementDiv);
    newElementDiv.classList.add('newElementDiv');
    
    arrayOBJ.push(object);
    console.log(arrayOBJ);

    inputValue.value = "";
});

elementDiv.addEventListener("click", (event) => {
    if(event.target.classList.contains("deleteBtn")){
        const taskDiv = event.target.closest('.newElementDiv');
        let taskID = parseInt(taskDiv.getAttribute("data-id"));
        taskDiv.remove();
        arrayOBJ = arrayOBJ.filter(t => t.id !== taskID); 
        console.log(arrayOBJ)
    }

    if(event.target.classList.contains("editBtn")){
        const editTask = event.target.closest('.newElementDiv');
        const taskValue = editTask.querySelector('.taskValue'); 
        editTask.classList.add('hide');

        let newTaskDiv = document.createElement('div');
        newTaskDiv.innerHTML = `
            <span><input type='text' placeholder="what's on your mind" class="editInput"></span> 
            <span class='BtnGroup'>
                <button class="saveBtn">Save</button>
                <button class="discardBtn">Discard</button>
            </span>`;
        newTaskDiv.classList.add('newElementDiv');
        elementDiv.appendChild(newTaskDiv);                        

        let save = newTaskDiv.querySelector('.saveBtn');
        let input = newTaskDiv.querySelector('.editInput');
        let discard = newTaskDiv.querySelector('.discardBtn');

        save.addEventListener('click', () => {
            let newInput = input.value.trim();
            if(newInput === ""){
                alert("Please enter the new Task!");
                return;
            }
            taskValue.innerHTML = newInput;
            editTask.classList.remove('hide');
            newTaskDiv.remove();
        });

        discard.addEventListener('click', () => {
            editTask.classList.remove('hide');
            newTaskDiv.remove();
        });
    }



    if(event.target.classList.contains('doneBtn')){
        const doneTask = event.target.closest(".newElementDiv");
        let targetedTask = doneTask.querySelector('.taskValue');
        targetedTask.classList.toggle("strike")
        
    }
});
