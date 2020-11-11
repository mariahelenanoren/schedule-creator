window.onload = startFunctions;

function startFunctions() {
    setEventListeners();
    createLocalStorageElements();
}

function setEventListeners() {
    const activityButton = document.querySelector("#new-activity-button"); 
    const submitButton = document.querySelector("#submit");
    const subjectInput = document.querySelector("#subject")
    const timeInput = document.querySelector("#time")

    const activityArray = [];

    activityButton.addEventListener("click", openAndCloseactivityForm);
    submitButton.addEventListener("click", function(e) {
        /*if (!subjectInput.value || !timeInput.value) {
            showAlert();
        }
        else {
            getInputValues();
            openAndCloseactivityForm();
        }  */
        e.preventDefault()
        getInputValues(activityArray); 
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

/*function getInputValues() {
    const inputs = document.querySelectorAll("input");
    const inputList = [];

    for (i = 0; i < inputs.length; i++) {
        inputList.push(inputs[i].value);
    }

    saveInputValues(inputList);
}*/

function getInputValues(activityArray) {
    const subjectInput = document.querySelector("#subject")
    const descriptionInput = document.querySelector("#description")
    const locationInput = document.querySelector("#location")
    const timeInput = document.querySelector("#time")
    const uniqueId = Date.now()

    var object = {

    }
    object["activity"] = subjectInput.value
    object["description"] = descriptionInput.value
    object["location"] = locationInput.value
    object["time"] = timeInput.value

    Object.defineProperty(object, "id", { value: uniqueId });

    activityArray.push(object)
    console.log(activityArray)

    const activityStorageInput = JSON.stringify(activityArray)
    localStorage.setItem("activity", activityStorageInput)

}


function saveInputValues(inputList) {

}


/*function saveInputValues(inputList) {
    const newDiv = document.createElement("div");
    const uniqueId = Date.now();
    newDiv.setAttribute("id", uniqueId);

    const inputUl = document.createElement("ul");
    for (i = 0; i < inputList.length; i++) {
        if (inputList[i].length >= 1) {
            const li = document.createElement("li");
            li.innerHTML = inputList[i];
            inputUl.appendChild(li);
        }
    }
    newDiv.appendChild(inputUl)

    localStorage.setItem("savedActivity", inputUl)
    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "remove-button")
    removeButton.innerHTML = "Remove activity"

    newDiv.appendChild(removeButton)

    const inputContainer = document.querySelector("#activity-container");
    inputContainer.appendChild(newDiv)

    removeButton.addEventListener("click", () => removeElement(newDiv))
}*/

/*function removeActivity(button) {
    button.path[2].removeChild(button.path[1]);
}

function removeElement(element) {
    const elementId = document.getElementById(element.id)
    console.log(element + " " + elementId)
    const parentElement = elementId.parentElement
    console.log(parentElement.removeChild(elementId))
}*/


function createLocalStorageElements() {
    const activityStorageOutput = localStorage.getItem("activity")

    const activity = JSON.parse(activityStorageOutput)

    console.log(activity)

}