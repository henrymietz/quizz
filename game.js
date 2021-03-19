const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const progressBar = document.getElementsByClassName('progress-bar')[0];
const loadingend = document.querySelector('.loading');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let scorePercent = 0;

let questions = [

    {
        question: 'Você é um adolescente?',
        choice1: 'Sim',
        choice2: 'Não',
    },

    {
        question: 'Você ganha algum dinheiro sem ser dos seus pais?',
        choice1: 'Sim',
        choice2: 'Não',
    },

    {
        question: 'Você quer aprender a ganhar o seu próprio dinheiro?',
        choice1: 'Sim',
        choice2: 'Não',
    },

    {
        question: 'Você gostaria de poder se sustentar e até mesmo ajudar seus pais financeiramente?',
        choice1: 'Sim',
        choice2: 'Não',
    },
    
    {
        question: 'O vídeo de explicação do Henry, sobre esse método INÉDITO, tem um limite de pessoas que podem assistir, você pretende ver até o final?',
        choice1: 'Sim',
        choice2: 'Não',
    },

];

const MAX_QUESTIONS = 5

startGame = () => {

    questionCounter = 0
    scorePercent = 0
    availableQuestions = questions
    getNewQuestion()

}

let currentChange = 0;
let changes = document.querySelectorAll(".textchange .change");
let maxchange = changes.length;

function nextChange() {
    changes[currentChange].classList.remove("selected");
    currentChange++;

    changes[currentChange].classList.add("selected");
}

function start() {
    setInterval(() => {
        nextChange()
    }, 1250)
}

function gamestyle() {
    const game = document.querySelector('#game')
    const border = document.querySelector(".conteiner")

    border.style.border = `none`;
    loadingend.style.display = `block`;
    game.style.display = `none`;

    setInterval(() => {
        const computedStyle = getComputedStyle(progressBar);
        const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0;

        progressBar.style.setProperty('--width', width + .087);
    }, 5)
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        gamestyle();
        start();

        setTimeout(() => {
            return window.location.assign('http://dinheiroadolescente.com')
        }, 5000)
    }
    
    progressText.innerText = `Questão 0${questionCounter + 1}`
    progressBarFull.style.width = `${((questionCounter)/MAX_QUESTIONS) * 100}%`
        
    scoreText.innerText = `${scorePercent}%`
    scorePercent += 100/MAX_QUESTIONS;  
    
    currentQuestion = availableQuestions[questionCounter]
    question.innerText = currentQuestion.question
    
    choices.forEach(choice => {
        const number = choice.dataset['number']
        
        choice.innerText = currentQuestion['choice' + number]
    })
    
    acceptingAnswers = true
    questionCounter++
}

choices.forEach(choice =>{

    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {

            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 500)

    })

})

startGame()

const target = document.querySelectorAll("[data-anime]");
const animationClass = 'animate';

function animeScroll() {
    target.forEach(function(elemento) {
            elemento.classList.add(animationClass);
    })
}

window.addEventListener("load", animeScroll)

//Fazer Trasição