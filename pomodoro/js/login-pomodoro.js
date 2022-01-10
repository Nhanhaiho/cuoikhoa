import { getUserFromLocalStorage  } from "./firebase-helper.js";

const user = getUserFromLocalStorage()

if(user) {
    //LOGGED IN
    console.log('logged in')
} else {
    //NOT LOGGED IN
    console.log('logged out')
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