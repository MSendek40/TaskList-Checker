{
    let tasks = [];

    let hideDoneTasks = false



    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks, { content: newTaskContent }];

        render();
    };


    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const render = () => {
        let tasksListHTMLContent = "";
        for (const task of tasks) {
            tasksListHTMLContent += `
            <li class="tasks__item js-tasks">
            <button class="tasks__button tasks__button--toggleDone js-done">
                ${task.done ? "✓" : ""}
            </button>
            <span class="tasks__content ${task.done ? " tasks__content--done" : ""}">
                ${task.content}
            </span>
            <button class="tasks__button tasks__button--remove js-remove">
                🗑
            </button>
        </li>`;
        }

        document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
        bindRemoveEvents();
    };

    const renderButtons = () => { };
    const bindButtonsEvents = () => { };

    const renderNewButtons = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    }

    const onformSubmit = (event) => {
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim()

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }
        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onformSubmit);
    };

    init();

}