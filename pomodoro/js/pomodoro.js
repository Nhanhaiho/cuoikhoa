const SBbtn = document.getElementById("short-break");
const LBbtn = document.getElementById("long-break");
const PoTimebtn = document.getElementById("pomodoro-time");
const containEl = document.getElementById("container");
const pdesEl = document.getElementById("time-des");
const startBtn = document.getElementById("Start-btn");
const stopBtn = document.getElementById("Stop-btn");
const resetBtn = document.getElementById("Reset-btn");
const m = document.getElementById("w-minute");
const s = document.getElementById("w-second");
// const deleteEl = document.getElementsByClassName(".fa-trash")
const pdes = ["Time to focus!", "Time for a break!", "Time for a long break!"];
const minute = [25, 5, 20];
const second = [00];
const audioEl1 = new Audio("/pomodoro/music/click2.mp3");
const audioEl2 = new Audio("/pomodoro/music/click3.mp3");
const audioEl3 = new Audio("/pomodoro/music/bell.mp3")
function clickSound1() {
  audioEl1.play(); // hàm click
}
function clickSound2() {
  audioEl2.play(); 
}
function endtimeSound() {
  audioEl3.play();
}
const titleEl = document.getElementById('title');
// console.log(m)
// thay đổi màu với background các thứ
const openSidebar = document.getElementById('btn-open-sidebars');
const closeSidebar=document.getElementById('btn-close-sidebars')
let currentScreen = "pomodoro";
PoTimebtn.addEventListener("click", () => {
  stopInterval()
  currentScreen = "pomodoro";
  clickSound2()
  pdesEl.innerHTML = pdes[0];
   titleEl.innerHTML = pdes[0];
  containEl.setAttribute("style", "background :rgb(217, 85, 80); ");
  startBtn.setAttribute("style", "color :rgb(217, 85, 80); ");
  stopBtn.setAttribute("style", "color :rgb(217, 85, 80); ");
  resetBtn.setAttribute("style", "color :rgb(217, 85, 80); ");
  openSidebar.setAttribute("style", "color :rgb(217, 85, 80); ");
  closeSidebar.setAttribute("style", "color :rgb(217, 85, 80); ");
  m.innerHTML = minute[0];
  s.innerText="00"
});


SBbtn.addEventListener("click", () => {
  stopInterval()
  currentScreen = "short_break";
  clickSound2()
  pdesEl.innerHTML = pdes[1]; //
  titleEl.innerHTML = pdes[1];
  containEl.setAttribute("style", "background :rgb(76, 145, 149); ");
  startBtn.setAttribute("style", "color :rgb(76, 145, 149); ");
  stopBtn.setAttribute("style", "color :rgb(76, 145, 149); ");
  resetBtn.setAttribute("style", "color :rgb(76, 145, 149); ");
  openSidebar.setAttribute("style", "color :rgb(76, 145, 149); ");
  closeSidebar.setAttribute("style", "color :rgb(76, 145, 149); ");
  m.innerHTML = minute[1];
  s.innerText="00"
});

LBbtn.addEventListener("click", () => {
  stopInterval()
  currentScreen = "long_break";
  clickSound2()
    pdesEl.innerHTML = pdes[2];
  titleEl.innerHTML = pdes[2];
  containEl.setAttribute("style", "background :rgb(69, 124, 163); ");
  startBtn.setAttribute("style", "color :rgb(69, 124, 163); ");
  stopBtn.setAttribute("style", "color :rgb(69, 124, 163); ");
  resetBtn.setAttribute("style", "color :rgb(69, 124, 163); ");
  openSidebar.setAttribute("style", "color :rgb(69, 124, 163); ");
  closeSidebar.setAttribute("style", "color :rgb(69, 124, 163); ");
  m.innerHTML=minute[2]
  s.innerText="00"
});

// phan timings

let startTimer;

startBtn.addEventListener("click", () => {
  if (startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
  } else {
    alert("timer already started");
  }
  clickSound1()
});
resetBtn.addEventListener("click", () => {
  
  // alert("are you sure you want to reset");
  if (currentScreen == "pomodoro") {
    m.innerText = minute[0];
  
  } else if (currentScreen == "short_break") {
    m.innerText = minute[1];
  
  } else if (currentScreen == "long_break") {
    m.innerText = minute[2];
  }
  s.innerText = "00";
  stopInterval();
  startTimer = undefined;
  clickSound1()
});
stopBtn.addEventListener("click", () => {
  stopInterval();
  startTimer = undefined;
  clickSound1()
});

function timer() {
  
  if (s.innerText != 0) {
    s.innerText--;
  } else if (m.innerText != 0 && s.innerText == 0) {
    s.innerText = 59;
    m.innerText--;
  }
  if (m.innerText == 0 && s.innerText == 0) {
    
    endtimeSound();
  }
}

function stopInterval() {
  // s.innerText="00";
  clearInterval(startTimer);
}

// phần todo
const inputEl = document.getElementById("todo-input"); //input el
const btnaddEl = document.getElementById("todo-add-btn"); // nut add
const ulEl = document.getElementById("todo-list-ul"); // cho de add li

const todos = [
  // { title: "Ăn tối", isDone: true, id: 1 },
  // { title: "Học bài", isDone: false, id: 2 },
  // { title: "Đi ngủ", isDone: false, id: 3 },
];

// tao ra object la 1 todo
function generateTodoElements(todo) {
  const containerli = document.createElement("div");
  containerli.style.display = "flex";
  containerli.style.justifyContent = "space-between";
  containerli.style.align = "center";

  const deleteEl = document.createElement("i");
  deleteEl.setAttribute("class", "fas fa-trash");
  deleteEl.classList.add("deleteTodo");
  deleteEl.setAttribute("data-id", todo.id);

  const todoElement = document.createElement("li");
  todoElement.setAttribute("class", todo.isDone ? "todoItem done" : "todoItem");
  todoElement.setAttribute("data-id", todo.id);
  todoElement.textContent = todo.title;

  containerli.appendChild(todoElement);
  containerli.appendChild(deleteEl);
  return containerli;
}
function renderTodos(todosData) {
  for (let todo of todosData) {
    let todoNode = generateTodoElements(todo);
    ulEl.appendChild(todoNode);
  }
  liTodos();
  removeTodo();
}

function liTodos() {
  const todoItemEls = document.querySelectorAll(".todoItem");
  // console.log(todoItemEls);
  todoItemEls.forEach((item) => {
    item.addEventListener("dblclick", () => {
      let todoId = item.getAttribute("data-id");
      for (var val of todos) {
        if (todoId == val.id) {
          val.isDone = !val.isDone;
        }
      }
      reRenderTodos();
    });
  });
}
// delete todo
function removeTodo() {
  const todoItemEls = document.querySelectorAll(".deleteTodo");
  for (let item of todoItemEls) {
    item.addEventListener("click", () => {
      let todoId = item.getAttribute("data-id");
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == todoId) {
          todos.splice(i, 1);
          reRenderTodos();
          break;
        }
      }
    });
  }
}
function reRenderTodos() {
  ulEl.innerHTML = "";
  renderTodos(todos);
}
btnaddEl.addEventListener("click", () => {
  if (inputEl.value !== "") {
    const newTodo = {
      title: inputEl.value,
      isDone: false,
      id: todos.length + 1,
    };
    todos.push(newTodo);
    inputEl.value = "";
    reRenderTodos();
  } else {
    alert("You have to type something");
  }
});

renderTodos(todos);
liTodos();

const loginBtnSwitchPage = document.getElementById("login-btn");
loginBtnSwitchPage.addEventListener("click", () => {
  window.location.href = "/pomodoro/html/login.html";
});

// music
// const playbtn = document.getElementById("play-btn");
// playbtn.addEventListener("click", () => {
//   playbtn.setAttribute('class',"fas fa-stop")
// })
let allMusic = [
  {
    name: "lofi1",
    path:"/pomodoro/music/lofi_music_1.mp3"
  },
  {
    name: "lofi2",
    path:"/pomodoro/music/lofi_music_2.mp3"
  },
  {
    name: "lofi3",
    path:"/pomodoro/music/lofi_music_3.mp3"
  },
  {
    name: "lofi4",
    path:"/pomodoro/music/lofi_music_4.mp3"
  },{
    name: "lofi5",
    path:"/pomodoro/music/lofi_music_5.mp3"
  }
]
// const audiolofi1 = new Audio('/pomodoro/music/lofi_music_1.mp3');
// audiolofi1.play()
const mainAduio = document.getElementById('main-audio');
const playMusicEl = document.getElementById('play-btn');
const prevSong = document.getElementById('prev')
const nextSong = document.getElementById('next')
let index_no = 0;
let playing_song = false;
const backIconEl = document.getElementById('backward-icon')
const playIconEl = document.getElementById('play-icon')
const forwardIconEl = document.getElementById('forward-icon')

let track = document.createElement("audio")
function loadTrack(index_no) {
  track.src = allMusic[index_no].path;
  track.load()
  
}
loadTrack(index_no);
function just_play() {
  if (playing_song == false) {
    playsong();
  } else {
    pausesong()
  }
  
}
// play song
function playsong() {
  track.play();
  playing_song = true;
  playIconEl.setAttribute('class','fas fa-pause')
}
// pause song
function pausesong() {
  track.pause();
  playing_song = false;
  playIconEl.setAttribute('class','fas fa-play')
  }
// next song 
function next_song() {
  if (index_no < allMusic.length - 1) {
    index_no++;
    loadTrack(index_no);
    playsong()
  } else {
    index_no = 0;
    loadTrack(index_no);
    playsong()
  }
}
// previous song 
function previous_song() {
  if (index_no > 0) {
    index_no--;
    loadTrack(index_no);
    playsong()
  } else {
    index_no = allMusic.length;
    loadTrack(index_no);
    playsong();
  }
}

// change background
const AllBackground = [
  {
    name: 'day',
    path: "/pomodoro/image/video-bg-day.mp4",
    icon :'fas fa-sun'
  },
  {
    name: 'night',
    path: "/pomodoro/image/video-bg-night.mp4",
    icon :'fas fa-moon'
  }
]
const button_background_day = document.getElementById('bg-change-btn-day');
const icon_background_day = document.getElementById('icon-bg-day');
const button_background_night = document.getElementById('bg-change-btn-night');
const icon_background_night = document.getElementById('icon-bg-night');
const video_background = document.getElementById('video-bg');
const icon_bg_el=document.getElementById('icon-bg')
button_background_day.addEventListener('click', () => {
  video_background.setAttribute('src', AllBackground[0].path);
  icon_background_day.style.color = "#FF5959";
   icon_background_night.style.color="#0F0E0E"
})
button_background_night.addEventListener('click', () => {
  video_background.setAttribute('src', AllBackground[1].path);
  icon_background_day.style.color = "#0F0E0E";
  icon_background_night.style.color = "#F0BB62"
  // icon_bg_el.style.background = 'rgba(255, 255, 255, 0.1)'
  //  icon_bg_el.style.backgroundSize ='50% left';
})

// phần modal
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-modal-close]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal);
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal);
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal);
  })
})


function openModal(modal) {
  if (modal == null) return
    modal.classList.add('active');
    overlay.classList.add('active')
}
function closeModal(modal) {
  if (modal == null) return
    modal.classList.remove('active');
    overlay.classList.remove('active')
}