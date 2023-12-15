const inputBox = document.getElementById("username");
const listContainer = document.getElementById("task_list");

 function addTask(event){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
 };

 listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove()
    };
 }, false);

function displayTasks() {
        fetch(apiToPost)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(tasks => {
                tasks.forEach(task => {
                    let li = document.createElement("li");
                    li.innerHTML = task.title;
                    li.id = task.id;
                    if (task.completed) {
                        li.classList.add("checked");
                    }
    
                    let span = document.createElement("span");
                    span.innerHTML = "\u00d7";
                    li.appendChild(span);
                    listContainer.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }
    window.onload = displayTasks;
