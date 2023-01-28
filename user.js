
let userData = localStorage.getItem('data')
let User = JSON.parse(userData)
let names = document.getElementById('head')
console.log(names)
window.getData = function () {
    names.innerHTML =`Welcome  ${User.firstName??"Admin"}!`
}

getData()


window.getQuizDataFromDb = function () {

    
    window.location.replace('quiz.html')

    
    

    
}