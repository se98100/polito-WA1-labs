const toggleBurgerMenu = () => {
    document.getElementById('tasks-list').classList.toggle('d-none');
    document.getElementById('filter').classList.toggle('d-none');
    document.getElementById('filter').classList.toggle('col-12');
}

window.addEventListener('resize', e => {
    if(document.getElementById('tasks-list').classList.contains('d-none') && window.innerWidth > 767)
        toggleBurgerMenu();
})

document.getElementsByClassName('navbar-toggler')[0].addEventListener('click', toggleBurgerMenu);

document.getElementById('all-filter').addEventListener('click', e => {
    if(e.target.classList.contains('active'))
        return;
    
    let tasks = tl.tasks;
    populate(tasks, 'All');
    document.querySelector('.list-group-flush > .active').classList.remove('active');
    e.target.classList.add('active');
    
    if(window.innerWidth < 768)
        toggleBurgerMenu();
});

document.getElementById('important-filter').addEventListener('click', e => {
    if(e.target.classList.contains('active'))
        return;
    
    let tasks = tl.tasks.filter(task => task.important);
    populate(tasks, 'Important');
    document.querySelector('.list-group-flush > .active').classList.remove('active');
    e.target.classList.add('active');
    
    if(window.innerWidth < 768)
        toggleBurgerMenu();
});

document.getElementById('today-filter').addEventListener('click', e => {
    if(e.target.classList.contains('active'))
        return;
    
    let tasks = tl.tasks.filter(task => task.deadline.isSame(dayjs(), 'day'));
    populate(tasks, 'Today');
    document.querySelector('.list-group-flush > .active').classList.remove('active');
    e.target.classList.add('active');
    
    if(window.innerWidth < 768)
        toggleBurgerMenu();
});

document.getElementById('week-filter').addEventListener('click', e => {
    if(e.target.classList.contains('active'))
        return;
    
    let tasks = tl.tasks.filter(task => (task.deadline.isAfter(dayjs(), 'day') && task.deadline.isBefore(dayjs().add(8, 'day').hour(0).minute(0))));
    populate(tasks, 'Next 7 Days');
    document.querySelector('.list-group-flush > .active').classList.remove('active');
    e.target.classList.add('active');
    
    if(window.innerWidth < 768)
        toggleBurgerMenu();
});

document.getElementById('private-filter').addEventListener('click', e => {
    if(e.target.classList.contains('active'))
        return;
    
    let tasks = tl.tasks.filter(task => task.private);
    populate(tasks, 'Private');
    document.querySelector('.list-group-flush > .active').classList.remove('active');
    e.target.classList.add('active');
    
    if(window.innerWidth < 768)
        toggleBurgerMenu();
});