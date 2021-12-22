import { 
    GoogleAuthProvider,
    getAuth, 
    signInWithPopup, 
    createUserWithEmailAndPassword,
    signInWithRedirect 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import { 
    saveUserToLocalStorage, 
    getUserFromLocalStorage 
} from "./firebase-helper.js";

const auth = getAuth();

function registerWithEmail(){
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            saveUserToLocalStorage(user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            //Basic loggin
            console.log(`
                errorCode: ${errorCode}
                errorMsg: ${errorMessage}
            `)
        });
}

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
        // Basic logging
        console.log(`
            errorCode: ${errorCode}
            errorMessage: ${errorMessage}
            errorEmail: ${email}
            errorCred: ${credential}
        `)
      });
}

function validateForm(){
    console.log('hellow')
    let x = document.forms[register].value;
    if (x == ""){
        alert("Vui lòng điền đầy đủ form");
        return false;
    }
}


const btnLogin = document.getElementById('btn-switch-login');
const btnRegister = document.getElementById('btn-switch-register');
const btnGglLogin = document.getElementById('gg-signin')
const registerForm = document.getElementById('register');

registerForm.addEventListener('submit', validateForm())


//btnGglLogin.addEventListener('click', loginWithGgl())
//btnRegister.addEventListener('click', registerWithEmail(), validateForm())