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

//copy pasterino from https://www.w3resource.com/javascript/form/email-validation.php
const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function validateForm(){
    //Get info from forms
    let userName = document.forms['register'][0].value;
    let email = document.forms['register'][1].value;
    let password = document.forms['register'][2].value;

    //Handle error messages
    let errorMessage = document.getElementById('errorMsg')
    if (typeof myTimeout != "undefined") clearTimeout(myTimeout);
    console.log(`
        userName: ${userName}
        email: ${email}
        password: ${password}
    `)
    
    if (userName === "" || email === "" || password === ""){
        alert("Vui lòng điền đầy đủ thông tin");
        errorMessage.innerHTML = "Vui lòng điền đầy đủ thông tin"
        console.log(errorMessage)
        let myTimeout = setTimeout(errorMessage.innerHTML = "", 5000)
        return false;
    } else if (!email.match(emailRegex)) {
        alert("email ko hợp lệ")
        return false;
    } else {
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
                //Basic logging
                alert(`${errorMessage}`)
                console.log(`
                    errorCode: ${errorCode}
                    errorMsg: ${errorMessage}
                `)
            });
    }
}



//DOM hell
const btnGglLogin = document.getElementById('gg-signin')
const registerForm = document.getElementById('register');
const registerFormBtn = document.getElementById('RegSubmit');
const errorMessagelist =  //Make a Firebase list

btnGglLogin.addEventListener('click', loginWithGgl)
registerFormBtn.addEventListener('click', validateForm)
//registerFormBtn.addEventListener('submit', validateForm)

