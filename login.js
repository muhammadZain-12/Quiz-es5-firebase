import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js"; 
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase,ref, set,onValue,onChildAdded  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
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

const auth = getAuth()
const database = getDatabase()


window.next = function () {
    window.location.replace('signUp.html')

}


let Email = document.getElementById('email')
let Password = document.getElementById('password')


window.getLoginData = function  () {

    let event  = {

        email:Email.value,
        password:Password.value,
        
    }


    let {email,password} = event
    
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const reference = ref(database,`users`)
    onChildAdded(reference,(e)=>{
        if(e.exists()){
            let val = e.val()
            console.log(val,":val")
            
                if(val.email == email){

                    localStorage.setItem('data',JSON.stringify(val))

                    if(val.category=="Admin"){
                        window.location.replace("admin.html")
                    }
                    else{
                        window.location.replace('user.html')
                    }
                
                
            }
        }
    })
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });



    


console.log(event)
}