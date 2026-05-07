const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const dayInput = document.getElementById('dayInput');

async function loadTasks() {
  const response = await fetch('/tasks');
  const tasks = await response.json();

  document.querySelectorAll('.day ul').forEach(ul => {
    ul.innerHTML = '';
  });

  tasks.forEach(task => {
    const dayColumn = document.querySelector(`#${task.day} ul`);

    if (!dayColumn) return;

    const li = document.createElement('li');

    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}"> 
        ${task.title}
      </span>
      
      <button onclick="toggleTask('${task._id}', ${task.completed})">
        ${task.completed ? 'Desfazer' : 'Feito'}
      </button>     


      <button onclick="deleteTask('${task._id}')">Apagar</button>
    `;

    dayColumn.appendChild(li);
  });
}

async function toggleTask(id, completed) {
  await fetch(`/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      completed: !completed
    })
  });

  loadTasks();
}

taskForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = taskInput.value;
  const day = dayInput.value;

  await fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, day })
  });

  taskInput.value = '';
  loadTasks();
});

async function deleteTask(id) {
  await fetch(`/tasks/${id}`, {
    method: 'DELETE'
  });

  loadTasks();
}

loadTasks();