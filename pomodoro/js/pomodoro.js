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
      wm.innerHTML = minute[0]
      
})
SBbtn.addEventListener('click', () => {
    containEl.setAttribute('style', 'background :rgb(76, 145, 149); ')
    pdesEl.innerHTML = pdes[1];
    startBtn.setAttribute('style', 'color :rgb(76, 145, 149); ') 
    stopBtn.setAttribute('style', 'color :rgb(76, 145, 149); ')
    resetBtn.setAttribute('style', 'color :rgb(69, 124, 163); ')  
    wm.innerHTML =minute[1]
});
LBbtn.addEventListener('click', () => {
    containEl.setAttribute('style', 'background :rgb(69, 124, 163); ')
    pdesEl.innerHTML = pdes[2];
    startBtn.setAttribute('style', 'color :rgb(69, 124, 163); ')  
    stopBtn.setAttribute('style', 'color :rgb(69, 124, 163); ') 
    resetBtn.setAttribute('style', 'color :rgb(69, 124, 163); ')  
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
    wm.innerText = 25;
    ws.innerText = "00";
    stopInterval()
    startTimer = undefined;
})
stopBtn.addEventListener('click', () => {
    stopInterval()
    startTimer = undefined;
})


var startTimer;
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