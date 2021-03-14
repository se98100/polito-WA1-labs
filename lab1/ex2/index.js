'use strict';

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('tasks.db')
var dayjs = require('dayjs');
var localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

function Task(id, desc, urgent = false, pri = true, deadline = null){
    this.id = id;
    this.description = desc;
    this.urgent = urgent;
    this.private = pri;
    this.deadline = deadline;

    this.print = () => {
        console.log(`Id: ${this.id}, Description: ${this.description}, ` +
            `Urgent: ${this.urgent}, Private: ${this.private}, Deadline: ${this.deadline != null ? this.deadline.format('LLL') : '<not defined>'}`);
    }
}

function TaskList(){
    this.tasks = [];

    this.sortAndPrint = () => {
        console.log('****** Tasks sorted by deadline (most recent first): ******');
        this.tasks
        .sort((a, b) => {
            if(a.deadline === null) return 1;
            if(b.deadline === null) return -1;
            return a.deadline.isBefore(b.deadline) ? -1 : 1
        })
        .forEach(task => task.print());
    }

    this.filterAndPrint = () => {
        console.log('****** Tasks filtered, only (urgent == true): ******');
        this.tasks
        .filter(task => task.urgent)
        .forEach(task => task.print());
    }

    this.printAll = () => {
        this.tasks.forEach(task => task.print());
    }
}

function load(taskList){
    return new Promise((res, rej) => {
        db.all('select * from tasks', (err, rows) => {
            if(err != null) rej(err);

            rows.forEach(row => {
                taskList.tasks.push(new Task(row.id, row.description, row.urgent == 1 ? true : false, 
                    row.private == 1 ? true : false, row.deadline != null ? dayjs(row.deadline) : null));
            });
            res();
        });
    });
}

function loadByDeadline(taskList, deadline){
    return new Promise((res, rej) => {
        db.all('select * from tasks where deadline > datetime(?, \'unixepoch\')', deadline.unix(), (err, rows) => {
            if(err != null) rej(err);

            rows.forEach(row => {
                taskList.tasks.push(new Task(row.id, row.description, row.urgent == 1 ? true : false, 
                    row.private == 1 ? true : false, row.deadline != null ? dayjs(row.deadline) : null));
            });
            res();
        });
    });
}

function loadByDescription(taskList, word){
    return new Promise((res, rej) => {
        db.all('SELECT * FROM tasks WHERE description like $word', {$word: `%${word}%`}, (err, rows) => {
            if(err != null) rej(err);

            rows.forEach(row => {
                taskList.tasks.push(new Task(row.id, row.description, row.urgent == 1 ? true : false, 
                    row.private == 1 ? true : false, row.deadline != null ? dayjs(row.deadline) : null));
            });
            res();
        });
    });
}

async function main(){
    var tl = new TaskList();
    console.log('****** Tasks: ******');
    await load(tl).then(() => tl.printAll());

    var tl1 = new TaskList();
    var deadline = dayjs('2021-03-10');
    console.log(`\n****** Tasks filtered, only (deadline > ${deadline.format('LL')}): ******`);
    await loadByDeadline(tl1, deadline).then(() => tl1.printAll());

    var tl2 = new TaskList();
    var word = 'y';
    console.log(`\n****** Tasks filtered, only (\'${word}\' in description): ******`);
    await loadByDescription(tl2, word).then(() => tl2.printAll());

    db.close();
}

main();