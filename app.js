// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase,ref, set  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDV7O_IP5eluXq2P5YY_SosohPt3qXNYvA",
  authDomain: "quiz-app-es5.firebaseapp.com",
  projectId: "quiz-app-es5",
  storageBucket: "quiz-app-es5.appspot.com",
  messagingSenderId: "309415739878",
  appId: "1:309415739878:web:8311216c07a76496251627",
  measurementId: "G-TV4K6JHMQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



window.routeToLogin  = function () {
window.location.replace('http://127.0.0.1:5500/login.html')

}

let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let Email = document.getElementById('email')
let Password = document.getElementById('password')

const auth = getAuth();
const database = getDatabase();

window.getData = function  () {
    let event  = {
        firstName : firstName.value,
        lastName:lastName.value,
        email:Email.value,
        password:Password.value,
        id:""
    }
    let {email,password} = event
    
createUserWithEmailAndPassword(auth, email,password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    const reference = ref(database,`users/${user.uid}`)
    delete event.password
    event.id = user.uid
    set(reference,event)

    setTimeout(()=>{
        window.location.replace('login.html')
    },1000)

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode)
    // ..
  });
        
    
}
