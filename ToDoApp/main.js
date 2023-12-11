const apiUrl = 'https://65745d27f941bda3f2afa877.mockapi.io/user';

document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('userId');
    if (userId) {
      loadTasks(userId);
    }
  });
  
  function loadTasks(userId) {
    const listContainer = document.getElementById('task_list');
  
    fetch(apiUrl + `/${userId}/tasks`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((tasks) => {
        tasks.forEach((task) => {
          let li = document.createElement('li');
          li.innerHTML = task.title;
          if (task.completed) {
            li.classList.add('checked');
          }
          listContainer.appendChild(li);
  
          let span = document.createElement('span');
          span.innerHTML = '\u00d7';
          li.appendChild(span);
        });
      })
      .catch((error) => {
        console.error('Error loading tasks:', error);
      });
  }
  
