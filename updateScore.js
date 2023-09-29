const scoreXOutput = document.querySelector('.point_x');
const scoreOOutput = document.querySelector('.point_o');
const scoreBothOutput = document.querySelector('.point_both');

let scoreX = 0;
let scoreO = 0;
let scoreBoth = 0;



if(localStorage.getItem('scoreX') && localStorage.getItem('scoreO')) {
    scoreX = localStorage.getItem('scoreX');
    scoreO = localStorage.getItem('scoreO');
    scoreBoth = localStorage.getItem('scoreBoth');
} else {
    localStorage.setItem('scoreX', 0);
    localStorage.setItem('scoreO', 0);
    localStorage.setItem('scoreBoth', 0);
    // scoreX = 0;
    // scoreO = 0;
    // scoreBoth = 0;
}

updateOutputScores();

export function updateScores(mark) {
    if(mark !== null) {
        if(mark === 1) {
            scoreX++;
            localStorage.setItem('scoreX', scoreX);
        } else {
            scoreO++;
            localStorage.setItem('scoreO', scoreO);
        }
    }
    scoreBoth++;
    localStorage.setItem('scoreBoth', scoreBoth);
    updateOutputScores();
}

function updateOutputScores() {
    scoreXOutput.innerHTML = scoreX;
    scoreOOutput.innerHTML = scoreO;
    scoreBothOutput.innerHTML = scoreBoth;
}