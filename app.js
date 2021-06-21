// Селекторы
const input = document.querySelector('.todoInput');
const list = document.querySelector('.todoList');

// Обработчики событий
input.addEventListener('keyup', (e) =>{
    if(e.keyCode === 13){
        addToDo();
    }
});

list.addEventListener('click', checkOrDelete);

// Добавить новую запись
function addToDo(){
    let todoDiv = document.createElement('div');
    let todo = document.createElement('li');
    let deleteBtn = document.createElement('button');

    todoDiv.classList = 'todoDiv';

    deleteBtn.innerHTML = '<img class="icon" src="svg/trash_bin.svg">';
    deleteBtn.classList = 'deleteBtn';

    todo.textContent = input.value;
    if(input.value == ''){
        return null;
    }
    todo.classList = 'todoItem';

    todoDiv.appendChild(todo);
    todoDiv.appendChild(deleteBtn);
    list.appendChild(todoDiv);

    localStorage.setItem('todos', list.innerHTML);

    input.value = '';
}

// Пометить запись как выполненную или удалить
function checkOrDelete(e) {
	let item = e.target;

	// Отметить как выполненное
	if(item.classList[0] == 'todoItem'){
		item.classList.toggle('done');
        localStorage.setItem('todos', list.innerHTML);
	}

	// Удалить запись
	if(item.classList[0] == 'deleteBtn'){
		let todo = item.parentElement;
		todo.remove();
        localStorage.removeItem('todos', list.innerHTML)
	}
}

// Электронные часы в верхней панели
function digitalClock(){
    let time = new Date();
	let divClock = document.querySelector('.clock');
    let hour = time.getHours();
    let min = time.getMinutes();

    if(hour < 10){hour = '0' + hour};
    if(min < 10){min = '0' + min};

    let currentTime = hour + ':' + min;
    

    divClock.innerHTML = currentTime;

    setTimeout(digitalClock, 1000);
}

// Мини-календарь под часами
function calendarDay(){
    let time = new Date();
	let divCalendar = document.querySelector('.calendar');
	let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 
    					'Пятница', 'Суббота'];
    let month = ['января', 'февраля', 'марта', 'апреля', 
    						'мая', 'июня', 'июля', 'августа', 
    				'сентября', 'октября', 'ноября', 'декабря'];

    let weekDay = days[time.getDay()];
    let day = time.getDate()
    let monthDay = month[time.getMonth()];
    
    divCalendar.innerHTML = weekDay + ',' + '&nbsp' + day + '&nbsp' + monthDay;
}

// Извлечь из хранилища записи (если существуют)
function loadToDo(){
    const data = localStorage.getItem('todos');
    if(data){
        list.innerHTML = data;
    }
}

loadToDo();
digitalClock();
calendarDay();