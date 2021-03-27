'use strict';

function populate(tasks){
    let filterName = document.getElementById('filter-title');
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
populate(tl.tasks);
