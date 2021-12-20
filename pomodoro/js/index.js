import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import { saveUserToLocalStorage, getUserFromLocalStorage } from "./firebase-helper.js";

const auth = getAuth();

function loginWithGgl(){
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
        console.log(user)
        saveUserToLocalStorage(user);
        
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(
            `errorCode: ${errorCode}
            errorMessage: ${errorMessage}
            errorEmail: ${email}
            errorCred: ${credential}`
        )
      });
}

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
// 
