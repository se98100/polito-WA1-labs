'use strict';

var dayjs = require('dayjs');
var localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

function Task(id, desc, urgent = false, pri = true, deadline = null){
    this.id = id;
    this.description = desc;
    this.urgent = urgent;
    this.private = pri;
    this.deadline = deadline;
}

function TaskList(){
    this.tasks = [];
    this.sortAndPrint = () => {
        this.tasks.sort((a, b) => {
            if(a.deadline === null) return 1;
            if(b.deadline === null) return -1;
            return a.deadline.isBefore(b.deadline) ? -1 : 1
        });
        console.log('****** Tasks sorted by deadline (most recent first): ******');
        this.tasks.forEach(task => console.log(`Id: ${task.id}, Description: ${task.description}, ` +
            `Urgent: ${task.urgent}, Private: ${task.private}, Deadline: ${task.deadline != null ? task.deadline.format('LLL') : '<not defined>'}`));
    }
}

var tl = new TaskList();
tl.tasks.push(new Task(0, 'Prima', false, true, dayjs()));
tl.tasks.push(new Task(1, 'Seconda', false, true, dayjs().add(5, 'd')));
tl.tasks.push(new Task(2, 'Terza', false, true));
tl.tasks.push(new Task(3, 'Quarta', false, true, dayjs().add(5, 'h')));
tl.tasks.push(new Task(5, 'Sesta', false, true));
tl.tasks.push(new Task(4, 'Quinta', false, true, dayjs().add(5, 'm')));

tl.sortAndPrint();