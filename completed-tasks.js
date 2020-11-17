window.onload = startFunctions;

function startFunctions() {
    getLocalStorage();
}

/**
 * Fetches list of objects saved in localStorage
 */
function getLocalStorage() {
    const allTasksLS = localStorage.getItem("completed-tasks")
    const allTasks = JSON.parse(allTasksLS)
    if (localStorage.getItem("completed-tasks")) {
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
    deleteButton.addEventListener("click", deleteElement, deleteButton)

    container.append(div);
    div.append(ul);
    div.append(deleteButton);
    
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

            const allTasksLS = localStorage.getItem("completed-tasks");
            const allTasks = JSON.parse(allTasksLS)
            const removedTask = allTasks[elementIndex]
            console.log("all tasks: " + allTasks)
            console.log(elementIndex)
            console.log(i)
            console.log("element" + allTasks[elementIndex])
            allTasks.splice(elementIndex, 1)
            localStorage.setItem("completed-tasks", JSON.stringify(allTasks))

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