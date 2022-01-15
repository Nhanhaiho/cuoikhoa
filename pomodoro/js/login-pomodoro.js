import { getUserFromLocalStorage, logoutUser  } from "./account-helper.js";

const user = getUserFromLocalStorage()
var username;


const loginBtn = document.getElementById("login-btn")


console.log(loginBtn)
if(user) {
    if(typeof user.displayName == "undefined"){
        username = user.email;
    } else {
        username = user.displayName;
    }
    loginBtn.innerHTML = `
        <button style="display: flex; width: 100%; align-items: center;" id="accButton"><img style="margin: 0px; border: 2px gray solid; max-width: 32px; height: auto; display: inline; border-radius: 8px;" id="profilePic" src="${user.photoURL}"><p id="bruh" style="overflow-x: auto; width: 100%; display: inline; word-wrap: break-word;">${username}</p></button>
    `
    console.log(document.getElementById("accButton"))
    document.getElementById("accButton")
        .addEventListener('mouseover', () => {
            document.getElementById("bruh").innerHTML = "Logout";
        })
        
    document.getElementById("accButton").addEventListener('click', () => {
            logoutUser();
        })
    document.getElementById("accButton").addEventListener('mouseout', () => {
        document.getElementById("bruh").innerHTML = username;
        })
    console.log('logged in')
} else {
    const loginBtnSwitchPage = document.getElementById("login-btn");
    loginBtnSwitchPage.addEventListener("click", () => {
        window.location.href = "/pomodoro/html/login.html";
    });
} 





if(user.stsTokenManager.expirataionDate < Date.now()){
    localStorage.removeItem("user");
    alert("Thời hạn đăng nhập đã hết hạn, xin hãy đăng nhập lại!");
    location.replace('../html/login.html')
}


////LOGOUT
export function logoutAccount() {
    localStorage.removeItem("user");
    window.location.reload();
}