
const btnLogin = document.getElementById('btn-switch-login');
const btnRegister = document.getElementById('btn-switch-register');
const formLoginEl = document.getElementById('login')
const formRegisterEl = document.getElementById('register')

const btnChangEl = document.getElementById('btn-change')

const btnGglLogin = document.getElementById('gg-signin')

btnRegister.addEventListener('click', () => {
    formLoginEl.style.left = "-400px";
    formRegisterEl.style.left = "50px";
     btnChangEl.style.left ="110px"
})

btnLogin.addEventListener('click', () => {
    formLoginEl.style.left = "50px";
    formRegisterEl.style.left = "450px";
     btnChangEl.style.left ="0px"
})