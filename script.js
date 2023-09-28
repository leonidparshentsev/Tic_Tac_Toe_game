const playGround = document.querySelector('.game__playground');
const currentTurnSpan = document.querySelector('.turn__span_mark');
const mainScreenRestartButton = document.querySelector('.game__restart_button');
const winnerRestartButton = document.querySelector('.winner__button');

let playGroundArr = [[], [], []];
let steps = 0;
let turn = true;
showCurrentTurn(turn);

mainScreenRestartButton.addEventListener('click', doRestart);
winnerRestartButton.addEventListener('click', doRestart);
playGround.addEventListener('click', playgroundLogic);

function playgroundLogic(event) {
    let target = event.target;
    let targetClass = target.classList[1];
    let [row, col] = targetClass.match(/\d+/ig);
    steps++;

    if(playGroundArr[row - 1][col - 1] === undefined) {
        playGroundArr[row - 1][col - 1] = turn ? 1 : 0;
        target.innerHTML = turn ? 'X' : 'O';
        turn = !turn;
        showCurrentTurn(turn);
    }

    if(steps > 4) {
        let winner = checkWinner(playGroundArr);
        if(winner !== null) {
            showWinnerScreen(winner);
            playGround.removeEventListener('click', playgroundLogic);
        }
        if(steps > 8 && !winner) {
            showWinnerScreen(null);
            playGround.removeEventListener('click', playgroundLogic);
        }
    }
}

function checkWinner(arr) {
    if((arr[0][0] === arr[0][1]) && (arr[0][0] === arr[0][2]) && arr[0][0] !== undefined) {
        highlightWinnerLine(1, 1, 1, 2, 1, 3);
        return arr[0][0];

    } else if ((arr[0][0] === arr[1][0]) && (arr[0][0] === arr[2][0]) && arr[0][0] !== undefined) {
        highlightWinnerLine(1, 1, 2, 1, 3, 1);
        return arr[0][0];

    } else if ((arr[2][0] === arr[2][1]) && (arr[2][0] === arr[2][2]) && arr[2][0] !== undefined) {
        highlightWinnerLine(3, 1, 3, 2, 3, 3);
        return arr[2][0];

    } else if ((arr[0][2] === arr[1][2]) && (arr[0][2] === arr[2][2]) && arr[0][2] !== undefined) {
        highlightWinnerLine(1, 3, 2, 3, 3, 3);
        return arr[0][2];

    } else if ((arr[0][1] === arr[1][1]) && (arr[0][1] === arr[2][1]) && arr[0][1] !== undefined) {
        highlightWinnerLine(1, 2, 2, 2, 3, 2);
        return arr[0][1];

    } else if ((arr[1][0] === arr[1][1]) && (arr[1][0] === arr[1][2]) && arr[1][0] !== undefined) {
        highlightWinnerLine(2, 1, 2, 2, 2, 3);
        return arr[1][0];

    } else if ((arr[0][0] === arr[1][1]) && (arr[0][0] === arr[2][2]) && arr[0][0] !== undefined) {
        highlightWinnerLine(1, 1, 2, 2, 3, 3);
        return arr[0][0];

    } else if ((arr[2][0] === arr[1][1]) && (arr[2][0] === arr[0][2]) && arr[2][0] !== undefined) {
        highlightWinnerLine(3, 1, 2, 2, 1, 3);
        return arr[2][0];

    } else {
        return null;
    }
}

function doRestart() {
    const winnerScreenWrapper = document.querySelector('.winner__wrapper');
    playGround.innerHTML = `<div class="playground__cell playground__row1_col1"></div>
    <div class="playground__cell playground__row1_col2"></div>
    <div class="playground__cell playground__row1_col3"></div>
    <div class="playground__cell playground__row2_col1"></div>
    <div class="playground__cell playground__row2_col2"></div>
    <div class="playground__cell playground__row2_col3"></div>
    <div class="playground__cell playground__row3_col1"></div>
    <div class="playground__cell playground__row3_col2"></div>
    <div class="playground__cell playground__row3_col3"></div>`
    
    playGroundArr = [[], [], []];
    turn = true;
    steps = 0;
    showCurrentTurn(turn);
    winnerScreenWrapper.classList.add('hidden');
    playGround.addEventListener('click', playgroundLogic);
}

function highlightWinnerLine(row1, col1, row2, col2, row3, col3) {
    let first = document.querySelector(`.playground__row${row1}_col${col1}`);
    let second = document.querySelector(`.playground__row${row2}_col${col2}`);
    let third = document.querySelector(`.playground__row${row3}_col${col3}`);
    first.classList.add('winner_state');
    second.classList.add('winner_state');
    third.classList.add('winner_state');
}

function showWinnerScreen(winnerMark) {
    const winnerTitleMark = document.querySelector('.winner__title_mark');
    const winnerTitleText = document.querySelector('.winner__title_text');
    const winnerScreenWrapper = document.querySelector('.winner__wrapper');

    if(winnerMark !== null) {
        winnerTitleMark.innerHTML = `${winnerMark === 1 ? `X` : `O`}`;
        winnerTitleText.innerHTML = 'TAKES THE ROUND';
        setTimeout(() => winnerScreenWrapper.classList.remove('hidden'), 1000);
    } else {
        winnerTitleMark.innerHTML = ``;
        winnerTitleText.innerHTML = 'NO ONE TAKES THE ROUND';
        setTimeout(() => winnerScreenWrapper.classList.remove('hidden'), 100);
    }
}

function showCurrentTurn(turn) {
    currentTurnSpan.innerHTML = turn ? 'X' : 'O';
}