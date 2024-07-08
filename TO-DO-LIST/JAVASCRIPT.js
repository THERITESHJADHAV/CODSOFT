document.addEventListener("DOMContentLoaded", function() {
function initializeTodoList(titleid, LISTCONTAINERid) 
{
    const inputbox = document.getElementById(titleid);                          // WE CREATED A CONSTANT VARIABLE INPUTBOX TO STORE THE TASK GIVEN BY USER IN THAT VARIABLE
    const listcontainer = document.getElementById(LISTCONTAINERid);             // WE CREATED A CONSTANT VARIABLE LISTCONTAINER TO STORE THE LIST ITEMS
    const addButton = document.getElementById(titleid + "Btn");

    console.log(`Initializing todo list with titleid: ${titleid}, LISTCONTAINERid: ${LISTCONTAINERid}, buttonId: ${titleid + "Btn"}`);

        if (!inputbox) {
            console.error(`Input box not found: ${titleid}`);
        }
        if (!listcontainer) {
            console.error(`List container not found: ${LISTCONTAINERid}`);
        }
        if (!addButton) {
            console.error(`Add button not found: ${titleid + "Btn"}`);
        }

        if (!inputbox || !listcontainer || !addButton) {
            return;
        }

    function addTask()
    {                                                         // CREATED A FUNCTION TO ADD TASK
        if(inputbox.value === '')
            {                                              // THIS CONDITION CHECK IF USER CLICK ON ADD BUTTON WITHOUT GIVING ANY TASK (EMPTY)
                alert("you must write something!");                                 // GIVES AN ALERT NOTIFICATION TO GIVE TASK
            }
        else
        {
            let li = document.createElement("li");                              //CREATE HTML ELEMENT LI TO STORE DATA ON SITE 
            li.innerHTML = inputbox.value;                                      // STORES THE GIVEN DATA IN LI ELEMENT
            listcontainer.appendChild(li);                                      // THE GIVEN DATA IS ADDED IN THE LIST 
            let span = document.createElement("span");                          // THE SPAN VARIABLE IS CREATED TO DISPLAY THAT CROSS BUTTON
            span.innerHTML = "\u00d7";                                          // \U00D7 IS THE CODE FOR THAT CROSS ICON
            li.appendChild(span);                                               // THIS ADD THAT CROSS ICON AT THE END OF THE TASK
        }
        inputbox.value = "";  
        saveData();                                                        //AFTER CLICKING ON BUTTON AND ADDING TASK IN LIST, THIS CLEARS THE TEXT OF INPUTBOX
        countTasks();                                         // Update task counts after adding a task
    }

    listcontainer.addEventListener("click", function(e)
    {
        if(e.target.tagName === "LI")
        {
            e.target.classList.toggle("CHECKED");
            saveData();
            countTasks();                                       // Update task counts after marking a task as completed
        }
        else if(e.target.tagName === "SPAN")
            {
                e.target.parentElement.remove();
                saveData();
                countTasks();                                     // Update task counts after removing a task
            }
    },false);

    function saveData() {
        try {
            localStorage.setItem(LISTCONTAINERid, listcontainer.innerHTML);
            countTasks();                                                                // Initialize task counts on page load
        } catch (error) {
            console.error("Error saving data to local storage:", error);
        }
    }

    function showTask() {
        try {
            listcontainer.innerHTML = localStorage.getItem(LISTCONTAINERid);
        } catch (error) {
            console.error("Error loading data from local storage:", error);
        }
    }

    addButton.addEventListener("click", addTask);

    showTask();
}

const TodoLists = [
    { titleid: "title1", LISTCONTAINERid: "listcontainer1"},
    { titleid: "title2", LISTCONTAINERid: "listcontainer2"},
    { titleid: "title4", LISTCONTAINERid: "listcontainer4"},
    { titleid: "title5", LISTCONTAINERid: "listcontainer5"},
    { titleid: "title6", LISTCONTAINERid: "listcontainer6"},
    { titleid: "title7", LISTCONTAINERid: "listcontainer7"},
];

TodoLists.forEach(todo => {
    initializeTodoList(todo.titleid, todo.LISTCONTAINERid);
});
});


// for scroll button

let scrollcontainer = document.querySelector(".SCROLL");
let backBtn = document.getElementById("backButton");
let nextBtn = document.getElementById("nextButton");

console.log("Scroll Container:", scrollcontainer);
    console.log("Back Button:", backBtn);
    console.log("Next Button:", nextBtn);

scrollcontainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollcontainer.scrollLeft += evt.deltaY;
});

nextBtn.addEventListener("click", ()=>{
    scrollcontainer.scrollLeft += 100;
});

backBtn.addEventListener("click", ()=>{
    scrollcontainer.scrollLeft -= 1000;
});

function countTasks() {
    const totalTasks = document.querySelectorAll('#listcontainer1 li').length;
    const completedTasks = document.querySelectorAll('#listcontainer1 li.CHECKED').length;
    const pendingTasks = totalTasks - completedTasks;
  
    // Update the HTML content
    document.getElementById('totalTasks').textContent = `${totalTasks}`;
    document.getElementById('completedTasks').textContent = `${completedTasks}`;
    document.getElementById('pendingTasks').textContent = `${pendingTasks}`;
  }
  
  // Call countTasks function to calculate counts initially
countTasks();
