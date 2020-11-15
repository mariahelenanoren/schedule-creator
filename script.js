window.onload = startFunctions;

function startFunctions() {
    getLocalStorage();
    setEventListeners();
}

/**
 * Sets eventlisteners
 */
function setEventListeners() {
    const activityButton = document.querySelector("#new-activity-button"); 
    const submitButton = document.querySelector("#submit");
    const subjectInput = document.querySelector("#subject")
    const timeInput = document.querySelector("#time")

    activityButton.addEventListener("click", openAndCloseactivityForm);
    submitButton.addEventListener("click", function(event) {
        if (!subjectInput.value || !timeInput.value) {
            showAlert();
        }
        else {
            getInputValues();
            openAndCloseactivityForm();
        }
        /* Prevents window from reloading on submit */
        event.preventDefault() 
    });
}

/**
 * Shows alerts if required input fields are not filled in
 */
function showAlert() {

    const subjectAlert = document.createElement("p")
    subjectAlert.innerHTML = "Please fill in an activity name"
    subjectAlert.setAttribute("id", "subjectAlert")
    const subjectContainer = document.querySelector(".subject")
    const subjectInput = document.querySelector("#subject")

    const timeAlert = document.createElement("p")
    timeAlert.innerHTML = "Please fill in a time"
    timeAlert.setAttribute("id", "timeAlert")
    const timeContainer = document.querySelector(".time")
    const timeInput = document.querySelector("#time")

    if (!document.querySelector("#subjectAlert") && !subjectInput.value) {
        subjectContainer.appendChild(subjectAlert)
    } 
    else if (document.querySelector("#subjectAlert") && subjectInput.value) {
        removeElement(subjectAlert)
    }

    if (!document.querySelector("#timeAlert") && !timeInput.value) {
        timeContainer.appendChild(timeAlert)
    } 
    else if (document.querySelector("#timeAlert") && timeInput.value) {
        removeElement(timeAlert)
    }
}

function openAndCloseactivityForm() {
    const activityForm = document.querySelector("#activity-form");
    if (activityForm.style.display == "none") {
        activityForm.style.display = "unset";
    } else {
        activityForm.style.display = "none"
    }

}

/**
 * Gets input values and makes them into objects
 */
function getInputValues() {
    const subjectInput = document.querySelector("#subject")
    const descriptionInput = document.querySelector("#description")
    const locationInput = document.querySelector("#location")
    const timeInput = document.querySelector("#time")
    const uniqueId = Date.now()

    var object = {}

    object["activity"] = subjectInput.value
    object["description"] = descriptionInput.value
    object["location"] = locationInput.value
    object["time"] = timeInput.value

    Object.defineProperty(object, "id", { value: uniqueId });

    createDocumentElements(object);
    saveInputToLocalStorage(object);
}

/**
 * Saves list of objects to localStorage
 * @param {string} input 
 */
function saveInputToLocalStorage(input) {
    const allEntries = []

    if (!localStorage.getItem("activity")) {
        allEntries.push(input)
        localStorage.setItem("activity", JSON.stringify(allEntries))
        console.log("no")
    }
    else {
        const oldEntriesLS = localStorage.getItem("activity")
        const oldEntries = JSON.parse(oldEntriesLS)
        for (each of oldEntries) {
            allEntries.push(each)
        }
        allEntries.push(input)
        localStorage.setItem("activity", JSON.stringify(allEntries))
    }
}

/**
 * Fetches list of objects saved in localStorage
 */
function getLocalStorage() {
    const activityArrayLS = localStorage.getItem("activity")
    const activityArray = JSON.parse(activityArrayLS)
    if (localStorage.getItem("activity")) {
        for (each of activityArray) {
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
    deleteButton.innerHTML = "Remove";
    deleteButton.setAttribute("class", "element-button");
    deleteButton.addEventListener("click", deleteElement, deleteButton)
    const completeButton = document.createElement("button");
    completeButton.innerHTML = "Complete";
    completeButton.setAttribute("class", "element-button complete-button");
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
/*function deleteElement(event) {
    const allDeleteButtons = document.querySelectorAll(".delete-button")

    for (let i = 0; i < allDeleteButtons.length; i++) {
        if (event.target === allDeleteButtons[i]) {
            const container = document.querySelector("#container")
            container.removeChild(allDeleteButtons[i].parentElement)

            const allEntriesArrayLS = localStorage.getItem("activity");
            const allEntriesArray = JSON.parse(allEntriesArrayLS)
            allEntriesArray.splice(i, 1)
            localStorage.setItem("activity", JSON.stringify(allEntriesArray))
        }
    }
}*/

/**
 * Removes the clicked button's parent div from page and corresponding object from localStorage
 * @param {MouseEvent} event - click event
 */
function deleteElement(event) {
    const allElementButtons = document.querySelectorAll(".element-button")

    for (let i = 0; i < allElementButtons.length; i++) {
        if (event.target === allElementButtons[i]) {
            const container = document.querySelector("#container")
            const elementIndex = Math.ceil((i / 2) - 1)
            container.removeChild(allElementButtons[i].parentElement)

            const allEntriesArrayLS = localStorage.getItem("activity");
            const allEntriesArray = JSON.parse(allEntriesArrayLS)
            const removedTask = allEntriesArray[elementIndex]
            allEntriesArray.splice(elementIndex, 1)
            localStorage.setItem("activity", JSON.stringify(allEntriesArray))

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
    console.log("completed task:" + completedTask)
    const allCompletedTasks = []

    if (!localStorage.getItem("completedTasks")) {
        allCompletedTasks.push(completedTask)
        localStorage.setItem("completedTasks", JSON.stringify(allCompletedTasks))
        console.log("no")
    }
    else {
        const oldTasksLS = localStorage.getItem("completedTasks")
        const oldTasks = JSON.parse(oldTasksLS)
        for (each of oldTasks) {
            allCompletedTasks.push(each)
        }
        allCompletedTasks.push(completedTask)
        localStorage.setItem("completedTasks", JSON.stringify(allCompletedTasks))
    }
}