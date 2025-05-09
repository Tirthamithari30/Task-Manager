$(document).ready(function() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        $('#taskList').empty();
        tasks.forEach((task, index) => {
            $('#taskList').append(`
          <li class="list-group-item">
            <span>${task}</span>
            <div>
              <button class="btn btn-sm btn-primary editBtn" data-index="${index}">Edit</button>
              <button class="btn btn-sm btn-danger deleteBtn" data-index="${index}">Delete</button>
            </div>
          </li>
        `);
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    $('#addTaskBtn').click(() => {
        const newTask = $('#taskInput').val().trim();
        if (newTask !== "") {
            tasks.push(newTask);
            saveTasks();
            renderTasks();
            $('#taskInput').val('');
        }
    });

    $('#taskList').on('click', '.deleteBtn', function() {
        const index = $(this).data('index');
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    });

    $('#taskList').on('click', '.editBtn', function() {
        const index = $(this).data('index');
        const updatedTask = prompt("Edit task:", tasks[index]);
        if (updatedTask !== null && updatedTask.trim() !== "") {
            tasks[index] = updatedTask.trim();
            saveTasks();
            renderTasks();
        }
    });

    renderTasks();
});