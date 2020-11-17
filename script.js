window.onload = startFunctions;

function startFunctions() {
    getLocalStorage();
    setEventListeners();
    getCurrentDate();
}

/**
 * Sets eventlisteners
 */
function setEventListeners() {
    const newTaskButton = document.querySelector("#new-task"); 
    const submitButton = document.querySelector("#submit");
    const taskInput = document.querySelector("#task");

    newTaskButton.addEventListener("click", openAndCloseTaskForm);
    submitButton.addEventListener("click", function(event) {
        /* Prevents window from reloading on submit */
        event.preventDefault()
        if (!taskInput.value) {
            showAlert();
        }
        else {
            getInputValues();
            openAndCloseTaskForm();
            emptyInputValues();
        }
    });
}

/**
 * Shows alerts if required input fields are not filled in
 */
function showAlert() {

    const taskAlert = document.createElement("p")
    taskAlert.innerHTML = "Please fill in a task"
    taskAlert.setAttribute("id", "taskAlert")
    const taskContainer = document.querySelector(".task")
    const taskInput = document.querySelector("#task")

    if (!document.querySelector("#taskAlert") && !taskInput.value) {
        taskContainer.appendChild(taskAlert)
    } 
    else if (document.querySelector("#taskAlert") && taskInput.value) {
        removeElement(taskAlert)
    }
}

function emptyInputValues() {
    const inputs = document.querySelectorAll("form input")
    for (input in inputs) {
        inputs[input].value = "";
    }
}

function openAndCloseTaskForm() {
    const taskForm = document.querySelector(".form-container");
    const newTaskButton = document.querySelector("#new-task");

    if (taskForm.style.display == "none" || taskForm.style.display == "") {
        taskForm.style.display = "flex";
    } else {
        taskForm.style.display = "none";
    }

}

/**
 * Gets input values and makes them into objects
 */
function getInputValues() {
    const taskInput = document.querySelector("#task")
    const descriptionInput = document.querySelector("#description")
    const locationInput = document.querySelector("#location")
    const timeInput = document.querySelector("#time")
    //const uniqueId = Date.now()

    var object = {}

    object["activity"] = taskInput.value
    object["description"] = descriptionInput.value
    object["location"] = locationInput.value
    object["time"] = timeInput.value

    //Object.defineProperty(object, "id", { value: uniqueId });

    createDocumentElements(object);
    saveInputToLocalStorage(object);
}

/**
 * Saves list of objects to localStorage
 * @param {string} input 
 */
function saveInputToLocalStorage(input) {
    const allTasks = []

    if (!localStorage.getItem("activity")) {
        allTasks.push(input)
        localStorage.setItem("activity", JSON.stringify(allTasks))
    }
    else {
        const oldTasksLS = localStorage.getItem("activity")
        const oldTasks = JSON.parse(oldTasksLS)
        for (each of oldTasks) {
            allTasks.push(each)
        }
        allTasks.push(input)
        localStorage.setItem("activity", JSON.stringify(allTasks))
    }
}

/**
 * Fetches list of objects saved in localStorage
 */
function getLocalStorage() {
    const allTasksLS = localStorage.getItem("activity")
    const allTasks = JSON.parse(allTasksLS)
    if (localStorage.getItem("activity")) {
        for (each of allTasks) {
            createDocumentElements(each)
        }
    }
}


/**
 * Creates a div with list of object values and adds to page
 * @param {Object} object
 */
function createDocumentElements(object) {
    const container = document.querySelector("#container");
    const div = document.createElement("div");
    const ul = document.createElement("ul");

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "minimize";
    deleteButton.setAttribute("class", "element-button delete-button material-icons");
    deleteButton.addEventListener("click", deleteElement, deleteButton);

    const completeButton = document.createElement("button");
    completeButton.innerHTML = "done";
    completeButton.setAttribute("class", "element-button complete-button material-icons");
    completeButton.addEventListener("click", deleteElement, completeButton)

    container.append(div);
    div.append(ul);
    div.append(deleteButton);
    div.append(completeButton);
    
    for (value of Object.values(object)) {
        if (value) {
            const li = document.createElement("li")
            li.innerHTML = value;
            ul.append(li)
        }
    }
}

/**
 * Removes the clicked button's parent div from page and corresponding object from localStorage
 * @param {MouseEvent} event - click event
 */
function deleteElement(event) {
    const allTaskButtons = document.querySelectorAll(".element-button")

    for (let i = 0; i < allTaskButtons.length; i++) {
        if (event.target === allTaskButtons[i]) {
            const container = document.querySelector("#container")
            const elementIndex = Math.ceil((i / 2) - 0.5)
            container.removeChild(allTaskButtons[i].parentElement)

            const allTasksLS = localStorage.getItem("activity");
            const allTasks = JSON.parse(allTasksLS)
            const removedTask = allTasks[elementIndex]
            console.log("all tasks: " + allTasks)
            console.log(elementIndex)
            console.log(i)
            console.log("element" + allTasks[elementIndex])
            allTasks.splice(elementIndex, 1)
            localStorage.setItem("activity", JSON.stringify(allTasks))

            if (event.target.classList.contains("complete-button")) {
                saveCompletedElement(removedTask)
            }
        }
    }
}

/**
 * Saves the completed tasks in an array in localStorage
 * @param {Object} completedTask 
 */
function saveCompletedElement(completedTask) {
    const allCompletedTasks = []

    if (!localStorage.getItem("completed-tasks")) {
        allCompletedTasks.push(completedTask)
        localStorage.setItem("completed-tasks", JSON.stringify(allCompletedTasks))
    }
    else {
        const oldTasksLS = localStorage.getItem("completed-tasks")
        const oldTasks = JSON.parse(oldTasksLS)
        for (each of oldTasks) {
            allCompletedTasks.push(each)
        }
        allCompletedTasks.push(completedTask)
        localStorage.setItem("completed-tasks", JSON.stringify(allCompletedTasks))
    }
}

function getCurrentDate() {
    const dateContainer = document.querySelector(".top-inner p")
    const currentDate = new Date();

    const date = currentDate.getDate();

    const dayNumber = currentDate.getDay();
    const dayString = formatDay(dayNumber)

    const monthNumber = currentDate.getMonth();
    const monthString = formatMonth(monthNumber);

    const year = currentDate.getFullYear();

    dateContainer.innerHTML = dayString + " the " + date + " of " + monthString + " " + year;
}

function formatDay(day) {
    switch(day) {
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        case 7: return "Sunday";
    }
}

function formatMonth(month) {
    switch(month) {
        case 0: return "January";
        case 1: return "February";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May";
        case 5: return "June";
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";
        case 11: return "December";
    }
}