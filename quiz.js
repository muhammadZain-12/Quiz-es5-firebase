import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js"; 
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getDatabase,ref, set ,push,onValue } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
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

let quiz = ''

window.getData = function () {

    const reference = ref(database,'quiz')
    onValue(reference,(e)=>{
        if(e.exists()){
            let val = e.val()
            let values = Object.values(val)
            quiz = values
            quizData()
        }
    })
}



getData()

let indexNumber = 0
let score = 0
let previousScore = 0
let question = document.getElementById('question')
let optionss = document.getElementById('options')
window.quizData = function () {
    question.innerHTML = ""
    optionss.innerHTML = ""
    let quizDatas = Object.values(quiz)
   console.log(quizDatas)
    
    question.innerHTML = quizDatas[indexNumber].question
    
    let optionsData = quizDatas[indexNumber].options
    console.log(optionsData)
    for (var i=0;i<optionsData.length;i++){
        console.log(optionsData[i])
        optionss.innerHTML += `<h4><input class="quizOption" type="checkbox" value='${optionsData[i]}' >${optionsData[i]}</input></h4>`
    }

}

let correctAnswer = []

window.getAnswer = function () {
    let quizOption = document.getElementsByClassName('quizOption')
    for (var i=0;i<quizOption.length;i++){
        if(quizOption[i].checked){
            correctAnswer.push(quizOption[i].value)
        }

    }
    
    for(var i=0;i<quiz[indexNumber].correctAnswer.length;i++){    
        for(var j=0;j<correctAnswer.length;j++){
            console.log('a')
            console.log(quiz)
            console.log(quiz[indexNumber].correctAnswer[i])
            console.log(correctAnswer[j])
            if(quiz[indexNumber].correctAnswer[i]==correctAnswer[j]){
                console.log('c')
                score = score+1
                indexNumber = indexNumber+1
                if(quiz.length===indexNumber){
                    console.log('b')
                    let quizapp = document.getElementById('main-div')
                    quizapp.style.display = 'none'
                    let scoreShow = document.getElementById('head-score')
                    let showScoreDiv = document.getElementById('scoreDiv')
                    showScoreDiv.style.display = "block"
                    indexNumber = 0
                    scoreShow.innerHTML = `Your Score is ${score}`
                }
                else{
                quizData()
            }
            }

            
        }

        
    }
    if(previousScore==score){
        indexNumber = indexNumber+1
        quizData()
    }
    else{
        previousScore = previousScore+1
    }

    
   
}

console.log(indexNumber)