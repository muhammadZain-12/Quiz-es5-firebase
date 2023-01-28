import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js"; 
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getDatabase,ref, set ,push } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
import { getAuth, signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDV7O_IP5eluXq2P5YY_SosohPt3qXNYvA",
    authDomain: "quiz-app-es5.firebaseapp.com",
    projectId: "quiz-app-es5",
    storageBucket: "quiz-app-es5.appspot.com",
    messagingSenderId: "309415739878",
    appId: "1:309415739878:web:8311216c07a76496251627",
    measurementId: "G-TV4K6JHMQS"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

const database  = getDatabase()
const auth = getAuth()

let userData = localStorage.getItem('data')
let User = JSON.parse(userData)
let names = document.getElementById('head')
window.getData = function () {
    names.innerHTML =`Welcome Back ${User.firstName??"Admin"}!`

}

onAuthStateChanged(auth,(user)=>{
    if(user){
        console.log(user)
    }
    else{
        window.location.replace('login.html')
    }
    })



getData()

let options = document.getElementById('options')
let question = document.getElementById('quizQuestion')
let questionButton = document.getElementById('btn-question')
window.getOptionsData = function () {
    if(question.value == ""){
        alert("Write Question")
    }
    else{
    question.disabled = "true"
    questionButton.disabled = "true"
    document.getElementById('question-para').innerHTML = `Question: ${question.value}`
    let options = document.getElementById('options-div')
    options.style.display = "flex"
    console.log(options)
    document.getElementById('optionButtonDiv').style.display = 'flex'
}
}

let showOptions = document.getElementById('showOptions')



let optionData = []
const submit = document.getElementById('submit-btn')


window.getOptions = function () {
    let option = document.getElementById('options')
    if(option.value == ""){
        alert("Write Option")
    }
    else{
    optionData.push(options.value)
    
    showOptions.innerHTML = ""
    for(var i=0;i<optionData.length;i++){
        console.log(showOptions,"show")
        console.log(optionData[i],"toppdsasd")
        showOptions.innerHTML += `<p><input class="option" type="checkbox"  value='${optionData[i]}' >Options${i+1}: ${optionData[i]}</input></p>`
        // let input =  document.createElement('input')
        // input.setAttribute('type','checkbox')
        // showOptions.appendChild(input)
    }
    submit.style.display = "block"
    let a = document.getElementById('options')
    a.value  = ""
}
}

window.submitDatatoDb = function () {
    let options = document.getElementsByClassName('option')
    console.log(options)
    let correctAnswer = []
    for(var i=0;i<options.length;i++){
        if(options[i].checked){
            console.log(options[i])
            correctAnswer.push(options[i].value)
            
        }
    }
    console.log(correctAnswer)
    if(correctAnswer.length>0){
        let event = {
            question : question.value,
            options:optionData,
            correctAnswer:correctAnswer
        }
        const reference  = ref(database,`quiz`)
        push(reference,event).then(()=>{
            alert("Data has been successfully submitted")
            let options = document.getElementById('options-div')
            options.style.display = "none"
    
            let optionButton = document.getElementById('optionButtonDiv')
            optionButton.style.display = "none"
            let questionPara = document.getElementById('question-para')
            questionPara.style.display = "none"
            let showQuestion = document.getElementById('quizQuestion')
            showQuestion.value = ""
            let optionInput = document.getElementById('options')
            optionInput.value = ""
            let showQuestionButton = document.getElementById('btn-question')
            showQuestion.disabled = false
            showQuestionButton.disabled = false
            const submitButton = document.getElementById('submit-btn')
            submitButton.style.display = "none"
            const hideOption = document.getElementById('showOptions')
            hideOption.innerHTML = ""
            optionData = []
    
        })
    }
    else{
        alert('Tick Correct Answer')
    }
    

    
}



window.logout = function () {
    signOut(auth).then(()=>{
        // window.location.replace('login.html')
    }).catch((error)=>{
        console.log(error)
    })
    
}

