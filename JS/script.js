{
    let tasks = [];
    let hidenDoneTask = false;

    const addNewTask = (newTaskContent) => {              
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (removedTaskIndex) => {               
        tasks = [
            ...tasks.slice(0, removedTaskIndex),
            ...tasks.slice(removedTaskIndex + 1),
        ];
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
        hidenDoneTask = !hidenDoneTask;
        render();
    };

    const bindEventsRmoveButtons = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };
        const bindEventsToogleDoneButtons = () => {
            const toogleDoneButtons = document.querySelectorAll(".js-done");
    
            toogleDoneButtons.forEach((toogleDoneButton, index) => {
                toogleDoneButton.addEventListener("click", () => {
                    toogleDoneTask(index);
                });
            });
    };

    const bindButtonsEvents = () => {                                 
        const toogleAllDone = document.querySelector(".js-allDone");

        if (toogleAllDone) {
            toogleAllDone.addEventListener("click", () => {
                toogleAllDoneTask();
            });
        };

        const hiddenTaskButton = document.querySelector(".js-hideDoneTask");   

        if (hiddenTaskButton) {
            hiddenTaskButton.addEventListener("click", () => {
                hideDoneTask();
            });
        };
    };


    const renderTasks = () => {
        let tasksListHTMLContent = "";
        for (const task of tasks) {
            tasksListHTMLContent += `
            <li class="tasks__item ${task.done && hidenDoneTask ? "tasks__item--hiden" : ""
                }"> 
            
            <button class="tasks__button tasks__button--toggleDone js-done">
                ${task.done ? "✓" : ""}
            </button>
          
            <span  ${task.done ? "class=\"tasks__content--done\"" : ""}>
            ${task.content}
        </span>

            <button class="tasks__button tasks__button--remove js-remove">
                🗑
            </button>
        </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
    };

        const renderButtons = () => {
            let renderedButtons = "";

            if (tasks.length > 0) {
                renderedButtons += `
                    <button class="buttons__button js-hideDoneTask">
                        ${hidenDoneTask ? "Pokaż" : "Ukryj"} ukończone
                    </button>
                    <button 
                        class="buttons__button js-allDone"
                        ${tasks.every(({ done }) => done) ? "disabled" : ""}
                    >
                        Ukończ wszystkie
                    </button>
                  `;
            }

            document.querySelector(".js-tasksButtons").innerHTML = renderedButtons;
        };

    ;

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