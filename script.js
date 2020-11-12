window.onload = startFunctions;

function startFunctions() {
    setEventListeners();
    getLocalStorage();
    console.log(localStorage.getItem("activity"))
}

function setEventListeners() {
    const activityButton = document.querySelector("#new-activity-button"); 
    const submitButton = document.querySelector("#submit");
    const subjectInput = document.querySelector("#subject")
    const timeInput = document.querySelector("#time")

    activityButton.addEventListener("click", openAndCloseactivityForm);
    submitButton.addEventListener("click", function(e) {
        if (!subjectInput.value || !timeInput.value) {
            showAlert();
        }
        else {
            getInputValues();
            openAndCloseactivityForm();
        }
        e.preventDefault() 
    });
}

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

function getLocalStorage() {
    const activityArrayLS = localStorage.getItem("activity")
    const activityArray = JSON.parse(activityArrayLS)
    if (localStorage.getItem("activity")) {
        for (each of activityArray) {
            createDocumentElements(each)
        }
    }
}

function createDocumentElements(object) {
    const container = document.querySelector("#container");
    const div = document.createElement("div");
    const ul = document.createElement("ul");
    container.append(div);
    div.append(ul);
    
    for (value of Object.values(object)) {
        if (value) {
            const li = document.createElement("li")
            li.innerHTML = value;
            ul.append(li)
        }
    }
}