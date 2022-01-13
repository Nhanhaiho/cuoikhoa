/////////////////
//////LOGIN//////
/////////////////
import { 
    GoogleAuthProvider,
    getAuth, 
    signInWithPopup, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signInWithRedirect 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import { 
    saveUserToLocalStorage, 
    getUserFromLocalStorage 
} from "./firebase-helper.js";

const auth = getAuth();
////CHECK IF USER IS ALREADY LOGGED IN
if (getUserFromLocalStorage()){
    document.getElementById('loginMain').innerHTML = `
     <div style="width:320px; height:200px;text-align:center;display:flex;justify-content: center;align-items: center; margin:0 auto;background:white;border-radius: 4px; margin-bottom:100px; padding:10px;">
          <div >
            <i class="fas fa-check-circle" style="font-size:70px; color:#93FFD8;"></i>
            <p style="font-weight: bold; margin-top:10px;">Login thành công về trang chính</p>
            <button style="width:100px;height:40px; margin-top:10px;border-radius:20%;border:none;background:#93FFD8;font-weight: bold; cursor:pointer; color:white;"  onclick="window.location.href='../../index.html'" >Enter</button>
          </div>
    </div>
    `
    console.log('logged in')
} else {
    console.log('not logged in')
}

function successfulLogin(user){
    saveUserToLocalStorage(user);
    location.replace('../../index.html')
}

////LOGIN BULLSHITS
function loginWithGgl(){
    console.log('help')
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.

        // const credential = GoogleAuthProvider.credentialFromResult(result);

        // we dont need to use credentials yet

        // const token = credential.accessToken;

        // this too

        // The signed-in user info.
        const user = result.user;
        successfulLogin(user)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // Basic logging
        console.log(`
            errorCode: ${errorCode}
            errorMessage: ${errorMessage}
            errorEmail: ${email}
            errorCred: ${credential}
        `)
      });
}

//copy pasterino from https://www.w3resource.com/javascript/form/email-validation.php
const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function registerWithEmail(){
    //Get info from forms
    let email = document.forms['register'][0].value; 
    let passwrd = document.forms['register'][1].value;
    let passwrdConfirm  = document.forms['register'][2].value;

    //Handle error messages
    let errorMessage = document.getElementById('errorMsg')
    if (typeof myTimeout != "undefined") clearTimeout(myTimeout);
    console.log(`
        email: ${email}
        password: ${passwrd}
    `)
    
    //Validate then execute form
    if (email === "" || passwrd === "" || passwrdConfirm === ""){
        alert("Vui lòng điền đầy đủ thông tin");
        errorMessage.innerHTML = "Vui lòng điền đầy đủ thông tin"
        console.log(errorMessage)
        let myTimeout = setTimeout(errorMessage.innerHTML = "", 5000)
        return false;
    } else if(passwrd != passwrdConfirm) {
        alert("Mật khẩu và nhập lại mật khẩu không đúng!")
        return false;
    }
    else if (!email.match(emailRegex)) {
        console.log('email ko hop le')
        alert("email ko hợp lệ")
        return false;
    } else {
        createUserWithEmailAndPassword(auth, email, passwrd)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                successfulLogin(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                //Basic logging
                alert(`${errorMessage}`)
                console.log(`
                    errorCode: ${errorCode}
                    errorMsg: ${errorMessage}
                `)
            });
    }
}

function loginWithEmail() {
    //Get info from forms
    let loginEmail = document.forms['login'][0].value;
    let loginPasswrd = document.forms['login'][1].value;

    //Validate then execute
    if(loginEmail === "" || loginPasswrd === "") {
        alert('vui lòng điền đầy đủ thông tin');
        return false;
    } else if(!loginEmail.match(emailRegex)){
        alert('email không hợp lệ!')
        return false;
    } else {
        signInWithEmailAndPassword(auth, loginEmail, loginPasswrd)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                successfulLogin(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`
                    errorCode: ${errorCode}
                    errorMsg: ${errorMessage}
                `)
            });
    }
}

////DOM + EVENT LISTENER
//DOM hell
const btnGglLogin = document.getElementById('gg-signin')
const registerFormBtn = document.getElementById('RegSubmit');
const loginFormBtn = document.getElementById('LoginSubmit');
const errorMessagelist =  //Make a Firebase list

console.log(btnGglLogin)

btnGglLogin.addEventListener('click', loginWithGgl)
registerFormBtn.addEventListener('click', registerWithEmail)
loginFormBtn.addEventListener('click', loginWithEmail)

/////////////////
////ANIMATION////
/////////////////
const btnLogin = document.getElementById('btn-switch-login');
const btnRegister = document.getElementById('btn-switch-register');
const formLoginEl = document.getElementById('login')
const formRegisterEl = document.getElementById('register')
const btnChangEl = document.getElementById('btn-change')

// thay đổi qua lại giữa register với login

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
