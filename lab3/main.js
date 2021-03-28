'use strict';

function populate(tasks, filter){
    document.querySelectorAll('#tasks-list > span').forEach((element) => {
        element.parentNode.removeChild(element);
    });

    let filterName = document.getElementById('filter-title');
    filterName.innerText = filter;
    for(const task of tasks){
        let format = task.deadline.isSame(dayjs(), 'day') ? '[Today at] HH:mm' : 'dddd D MMMM YYYY [at] HH:mm';
        filterName.insertAdjacentHTML('afterend', `
            <span class="d-flex border-bottom px-4 py-3">
                <span class="d-flex align-items-center flex-grow-1 col-xl-7 ${task.important ? 'text-danger' : ''}">
                    <input type="checkbox" class="mr-2"/>
                    ${task.description}
                </span>
                <img src="public.svg" height="24px" class="flex-grow-1 flex-xl-grow-0 ${task.private ? 'd-none' : ''}">
                <span class="deadline flex-xl-fill ${task.deadline.isValid() ? '' : 'd-none'}">${task.deadline.format(format)}</span>
            </span>
        `);
    }
}

var tl = new TaskList();
tl.loadFromObj(database);
populate(tl.tasks, 'All');

document.getElementById('all-filter').addEventListener('click', e => {
    if(e.target.classList.contains('active'))
        return;
    
    let tasks = tl.tasks;
    populate(tasks, 'All');
    document.querySelector('.list-group-flush > .active').classList.remove('active');
    e.target.classList.add('active');
});

document.getElementById('important-filter').addEventListener('click', e => {
    if(e.target.classList.contains('active'))
        return;
    
    let tasks = tl.tasks.filter(task => task.important);
    populate(tasks, 'Important');
    document.querySelector('.list-group-flush > .active').classList.remove('active');
    e.target.classList.add('active');
});

document.getElementById('today-filter').addEventListener('click', e => {
    if(e.target.classList.contains('active'))
        return;
    
    let tasks = tl.tasks.filter(task => task.deadline.isSame(dayjs(), 'day'));
    populate(tasks, 'Today');
    document.querySelector('.list-group-flush > .active').classList.remove('active');
    e.target.classList.add('active');
});

document.getElementById('week-filter').addEventListener('click', e => {
    if(e.target.classList.contains('active'))
        return;
    
    let tasks = tl.tasks.filter(task => (task.deadline.isAfter(dayjs(), 'day') && task.deadline.isBefore(dayjs().add(8, 'day').hour(0).minute(0))));
    populate(tasks, 'Next 7 Days');
    document.querySelector('.list-group-flush > .active').classList.remove('active');
    e.target.classList.add('active');
});

document.getElementById('private-filter').addEventListener('click', e => {
    if(e.target.classList.contains('active'))
        return;
    
    let tasks = tl.tasks.filter(task => task.private);
    populate(tasks, 'Private');
    document.querySelector('.list-group-flush > .active').classList.remove('active');
    e.target.classList.add('active');
});
