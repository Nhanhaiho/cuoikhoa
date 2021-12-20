const SBbtn = document.getElementById('short-break')
const LBbtn = document.getElementById('long-break')
const PoTimebtn = document.getElementById('pomodoro-time');
const containEl = document.getElementById('container')
const pdesEl = document.getElementById('time-des')
const startBtn = document.getElementById('Start-btn')
const stopBtn = document.getElementById('Stop-btn')
const resetBtn = document.getElementById('Reset-btn')
const wm = document.getElementById('w-minute');
const ws = document.getElementById('w-second');
// const deleteEl = document.getElementsByClassName(".fa-trash")
const pdes = ['Time to focus!', 'Time for a break!', 'Time for a long break!']
const minute = [25, 5, 20]
const second = [00]

// thay đổi màu với background các thứ 
  PoTimebtn.addEventListener('click', () => {
      containEl.setAttribute('style', 'background :rgb(217, 85, 80); ')   
      pdesEl.innerHTML = pdes[0];
      startBtn.setAttribute('style', 'color :rgb(217, 85, 80); ') 
      stopBtn.setAttribute('style', 'color :rgb(217, 85, 80); ') 
      resetBtn.setAttribute('style', 'color :rgb(217, 85, 80); ')
    //   deleteEl.setAttribute('style', 'color :rgb(217, 85, 80); ')
      wm.innerHTML = minute[0]
      
})
SBbtn.addEventListener('click', () => {
    containEl.setAttribute('style', 'background :rgb(76, 145, 149); ')
    pdesEl.innerHTML = pdes[1];
    startBtn.setAttribute('style', 'color :rgb(76, 145, 149); ') 
    stopBtn.setAttribute('style', 'color :rgb(76, 145, 149); ')
    resetBtn.setAttribute('style', 'color :rgb(76, 145, 149); ')
    // deleteEl.setAttribute('style', 'color :rgb(76, 145, 149); ') 
    wm.innerHTML =minute[1]
});
LBbtn.addEventListener('click', () => {
    containEl.setAttribute('style', 'background :rgb(69, 124, 163); ')
    pdesEl.innerHTML = pdes[2];
    startBtn.setAttribute('style', 'color :rgb(69, 124, 163); ')  
    stopBtn.setAttribute('style', 'color :rgb(69, 124, 163); ') 
    resetBtn.setAttribute('style', 'color :rgb(69, 124, 163); ') 
    // deleteEl.setAttribute('style', 'color :rgb(69, 124, 163); ') 
     wm.innerHTML =minute[2]
});

// phan timings
var startTimer;
startBtn.addEventListener('click', () => {
    if (startTimer === undefined) {
        startTimer =setInterval(timer,1000)
    } else {
        alert('timer already started');
    }
})
resetBtn.addEventListener('click', () => {
    alert('are you sure you want to reset')
    wm.innerText = 25;
    ws.innerText = "00";
    stopInterval()
    startTimer = undefined;
})
stopBtn.addEventListener('click', () => {
    stopInterval()
    startTimer = undefined;
})



function timer() {
    if (ws.innerText != 0) {
        ws.innerText--;
    } else if (wm.innerText != 0 && ws.innerText == 0) {
        ws.innerText = 59;
        wm.innerText--;
    }
    if (wm.innerText == 0 && ws.innerText == 0-1) {
        alert('xong')
    }
}

function stopInterval() {
    clearInterval(startTimer)
}


// phần todo
const inputEl = document.getElementById('todo-input');//input el
const btnaddEl = document.getElementById('todo-add-btn'); // nut add 
const ulEl = document.getElementById('todo-list-ul');// cho de add li

const todos = [
    // { title: "Ăn tối", isDone: true, id: 1 },
    // { title: "Học bài", isDone: false, id: 2 },
    // { title: "Đi ngủ", isDone: false, id: 3 },
];

// tao ra object la 1 todo
function generateTodoElements(todo) {
    const containerli = document.createElement('div');
    containerli.style.display = "flex";
    containerli.style.justifyContent = "space-between";
    containerli.style.align = "center";

    const deleteEl = document.createElement('i');
    deleteEl.setAttribute('class', "fas fa-trash")
    deleteEl.classList.add('deleteTodo')
    deleteEl.setAttribute('data-id',todo.id)

    const todoElement = document.createElement('li');
    todoElement.setAttribute('class', todo.isDone ? "todoItem done" : "todoItem")
    todoElement.setAttribute('data-id',todo.id)
    todoElement.textContent = todo.title;
    
    containerli.appendChild( todoElement);
    containerli.appendChild(deleteEl);
    return containerli;
}
function renderTodos(todosData) {
    for (let todo of todosData)  {
        let todoNode = generateTodoElements(todo);
        ulEl.appendChild(todoNode);
    }
    liTodos()
    removeTodo()
}

function liTodos() {
    const todoItemEls = document.querySelectorAll('.todoItem');
    // console.log(todoItemEls);
    todoItemEls.forEach(item => {
        item.addEventListener('dblclick', () => {
            let todoId = item.getAttribute('data-id')
            for (var val of todos) {
                if (todoId==val.id) {
                    val.isDone = !val.isDone;
            }
            }
              reRenderTodos()
        })
    })
}

// delete todo
function removeTodo() {
    const todoItemEls = document.querySelectorAll('.deleteTodo');
    for (let item of todoItemEls) {
        item.addEventListener('click', () => {
            let todoId = item.getAttribute('data-id')
            for (let i = 0; i < todos.length; i++){
                if (todos[i].id == todoId) {
                    todos.splice(i, 1);
                    reRenderTodos()
                    break;
                }
            }
        })
    }
}


function reRenderTodos() {
     ulEl.innerHTML = "";
    renderTodos(todos)
}

btnaddEl.addEventListener('click', () => {
    if (inputEl.value !== "") {
        const newTodo = {
        title: inputEl.value,
        isDone: false,
        id:todos.length+1
    }
    todos.push(newTodo);
    
  
    inputEl.value = "";
     reRenderTodos()
    } else {
        alert('nhap j do di ban')
}
})

renderTodos(todos)
liTodos()