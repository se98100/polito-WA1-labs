'use strict';

dayjs.extend(window.dayjs_plugin_localizedFormat);

function Task(id, desc, important = false, pri = true, deadline = null){
    this.id = id;
    this.description = desc;
    this.important = important;
    this.private = pri;
    this.deadline = deadline;
}

function TaskList(){
    this.tasks = [];

    this.loadFromObj = obj => {
        for(const task of obj)
            this.tasks.push(new Task(task.id, task.description, task.important, task.private, dayjs(task.deadline, "MM-DD-YYYY HH:mm")));
    }
}
