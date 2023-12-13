const inputBox = document.getElementById("username");
const listContainer = document.getElementById("task_list");
const userId = localStorage.getItem('userId');
const apiToPost = `https://65745d27f941bda3f2afa877.mockapi.io/user/${userId}/tasks/`;

let dataStructure = {
    userId: userId,
    title: null,
    completed: false,
}

console.log(`Айди пользователя - ${localStorage.getItem('userId')}`)

function fillDataStructure(dataStructure, title, completed) {
    dataStructure.title = title;
    dataStructure.completed = completed;
    return dataStructure;
}

function clearDataStructure(dataStructure){
    dataStructure.title = null;
    dataStructure.completed = false
}

function addTask(event){
    if(inputBox.value !== ""){
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);


        let dataToSubmit = fillDataStructure(dataStructure, String(inputBox.value), false);
        console.log("Отправка данных ", dataToSubmit) 
        
        fetch(apiToPost, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSubmit)
          })
            .then(response => response.json())
            .then(data => li.id = data.id)
            .catch(error => console.error('Error:', error));

    }
    else {
        alert("You must write something!");
    }
    inputBox.value = "";
 };

 listContainer.addEventListener("click", async function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        
        // Получение информации о текущем состоянии завершенности задачи
        async function changeCompletedStatus(target) {
            try {
                const response = await fetch(`https://65745d27f941bda3f2afa877.mockapi.io/user/${userId}/tasks/${target.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }

                const data = await response.json();
                const completedStatus = data.completed;

                console.log("Информация по GET запросу", data);

                // Изменение состояния завершенности задачи
                const responsePut = await fetch(`https://65745d27f941bda3f2afa877.mockapi.io/user/${userId}/tasks/${target.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ completed: !completedStatus })
                });

                if (!responsePut.ok) {
                    throw new Error(`Ошибка HTTP: ${responsePut.status}`);
                }

                const dataPut = await responsePut.json();
                console.log("Информация по PUT запросу", dataPut);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        await changeCompletedStatus(e.target);
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        fetch(`https://65745d27f941bda3f2afa877.mockapi.io/user/${userId}/tasks/${e.target.parentElement.id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    };
}, false);

