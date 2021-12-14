const SBbtn = document.getElementById('short-break')
const LBbtn = document.getElementById('long-break')
const PoTimebtn = document.getElementById('pomodoro-time');
const containEl = document.getElementById('container')
const pdesEl = document.getElementById('time-des')
const startBtn = document.getElementById('Start-btn')
const timeEl = document.getElementById('time')
const pdes = ['Time to focus!', 'Time for a break!', 'Time for a long break!']
const time = ['25:00', '5:00', '20:00']

  PoTimebtn.addEventListener('click', () => {
      containEl.setAttribute('style', 'background :rgb(217, 85, 80); ')   
      pdesEl.innerHTML = pdes[0];
      startBtn.setAttribute('style', 'color :rgb(217, 85, 80); ')   
      timeEl.innerHTML =time[0]
})
SBbtn.addEventListener('click', () => {
    containEl.setAttribute('style', 'background :rgb(76, 145, 149); ')
    pdesEl.innerHTML = pdes[1];
    startBtn.setAttribute('style', 'color :rgb(76, 145, 149); ')  
    timeEl.innerHTML =time[1]
});
LBbtn.addEventListener('click', () => {
    containEl.setAttribute('style', 'background :rgb(69, 124, 163); ')
    pdesEl.innerHTML = pdes[2];
    startBtn.setAttribute('style', 'color :rgb(69, 124, 163); ')  
    timeEl.innerHTML =time[2]
});

