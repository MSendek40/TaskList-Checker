{
    let tasks = [];
    let hidenDoneTask = false;

    const addNewTask = (newTaskContent) => {              //* dodawanie nowych elementów listy
        tasks = [
            ...tasks,
            {content:newTaskContent}
        ]
        render();
    };

    const removeTask = (removedIndex) => {                //* usuwanie elementow z listy 
        tasks = [
            ...tasks.slice(0, removedIndex),
            ...tasks.slice(removedIndex +1),
        ]
        render();
    };

    const toggleTaskDone = (index) => {            //* funkcja dotyczy skreslenia rzeczy wykonanych
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toogleAllDoneTask = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const hideDoneTask = () => {
        hiddenDoneTask = !hiddenDoneTask;
        render();
    };

    const bindEvents = () => {                                         
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

    const bindButtonsEvents = () => {                                   //* przycisk wszystie skonczone
        const toogleAllDone = document.querySelector(".js-allDone");

        if (toogleAllDone) {
            toogleAllDone.addEventListener("click", () => {
                toogleAllDoneTask();
            });
        };

        const hiddenTaskButton = document.querySelector(".js-hideDoneTask");   //* ukryj wszysktie zrobione

        if (hiddenTaskButton) {
            hiddenTaskButton.addEventListener("click", () => {
                hideDoneTask();
            });
        };
    }


    const renderTasks = () => {
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
        bindEvents();
    };

    

    const render = () => {
        renderTasks();
        renderButtons();

        bindEventsRemoveButtons();
        bindEventsToogleDoneButtons();
        bindButtonsEvents();
    };

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