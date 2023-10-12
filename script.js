import { updateScores } from "./updateScore.js";

const playGround = document.querySelector('.game__playground');
const currentTurnSpan = document.querySelector('.turn__span_mark');
const mainScreenRestartButton = document.querySelector('.game__restart_button');
const winnerRestartButton = document.querySelector('.winner__button');

const pvpGame = document.querySelector('.pvp_button');
const cpuGame = document.querySelector('.cpu_button');
const menu = document.querySelector('.game__menu');

const GAME_MODS = {
    'PVP': true,
    'PVC': false,
};

const MARK = {
    true: 'X',
    false: 'O',
}

const CELLS_NUMBERS = {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2],
};

// let playGroundArr = [[], [], []];
let playGroundArr = [[1, 2, 3], [4, 5, 6], [7, 8 ,9]];
let steps = 0;
let turn = true;  // X - true / O - false;
let cpuFirstStepFlag = true;
let currentGameMode = GAME_MODS.PVP;
showCurrentTurn(turn);

pvpGame.addEventListener('click', playgroundPvPMode);
cpuGame.addEventListener('click', playgroundPvCMode);

mainScreenRestartButton.addEventListener('click', doRestart);
winnerRestartButton.addEventListener('click', doRestart);

function playgroundPvPMode() {
    menu.style.display = 'none';
    currentGameMode = GAME_MODS.PVP;

    playGround.addEventListener('click', playgroundPvPModeHandler);

    function playgroundPvPModeHandler(event) {
        playgroundLogicPlayer(event);

        playgroundLogic(playGroundArr, playgroundPvPModeHandler);
    }
}

function playgroundPvCMode() {
    const selectedMark = document.querySelector('.active');
    let playerMark = selectedMark.classList.contains('select__x');

    menu.style.display = 'none';
    currentGameMode = GAME_MODS.PVC;

    if(!playerMark && cpuFirstStepFlag) {
        playgroundLogicCpu(playGroundArr, playerMark);
        cpuFirstStepFlag = false;
    }
    
    playGround.addEventListener('click', playgroundPvCModeHandler);

    function playgroundPvCModeHandler(event) {
        
        if(playgroundLogicPlayer(event)) {
            playgroundLogic(playGroundArr, playgroundPvCModeHandler);
    
            if(steps > 8) return;
            
            playgroundLogicCpu(playGroundArr, playerMark);
            playgroundLogic(playGroundArr, playgroundPvCModeHandler);
        }
    }
}

function playgroundLogicPlayer(event) {
    let target = event.target;
    let targetClass = target.classList[1];
    let [row, col] = targetClass.match(/\d+/ig);
 
    if(typeof playGroundArr[row][col] === 'number') {

        playGroundArr[row][col] = MARK[turn];
        target.innerHTML = MARK[turn];
        turn = !turn;
        showCurrentTurn(turn);
        steps++;
        return true;
    }
    return false;
}

function playgroundLogicCpu(playGroundArr, playerMark) {
    let cpuMark = !playerMark;
    let step = minimax(playGroundArr, cpuMark)[1];
    
    let [row, col] = CELLS_NUMBERS[step];
    const targetCell = document.querySelector(`.playground__row${row}_col${col}`);

    playGroundArr[row][col] = MARK[cpuMark];
    targetCell.innerHTML = MARK[cpuMark];

    turn = !turn;
    showCurrentTurn(turn);
    steps++;

    function minimax(inputPlayGround, currentMark) {
        inputPlayGround = cloneArray(inputPlayGround);

        if(checkGameOver(inputPlayGround)) {
            let winner = checkWinner(inputPlayGround)[0];
            if(winner) return [(winner === MARK[cpuMark] ? 1 : -1), '']
            else return [0, '']
        }

        let bestMove;
        let bestValue;

        if(currentMark !== cpuMark) bestValue = Infinity;
        else bestValue = -Infinity;

        let moves = findAvailableMoves(inputPlayGround);

        for(let move of moves) {
            let newPlayGround = cloneArray(inputPlayGround);
            let [row, col] = CELLS_NUMBERS[move];
            newPlayGround[row][col] = MARK[currentMark];

            let nextValue = minimax(newPlayGround, !currentMark)[0];
            if(currentMark === cpuMark && nextValue > bestValue) {
                bestValue = nextValue;
                bestMove = move;
            }
            if(currentMark !== cpuMark && nextValue < bestValue) {
                bestValue = nextValue;
                bestMove = move;
            }
        }
        return [bestValue, bestMove];
    }
}

function playgroundLogic(playGroundArr, removeHandler) {
    if(checkGameOver(playGroundArr)) {
        playGround.removeEventListener('click', removeHandler);
        let [winner, ...cells] = checkWinner(playGroundArr);
        if(winner) highlightWinnerLine(...cells);
        
        showWinnerScreen(winner);

        return;
    } 
}

function checkGameOver(playGroundArr) {
    let moves = findAvailableMoves(playGroundArr).length;
    let winner = checkWinner(playGroundArr)[0];

    if(moves > 0 && !winner) return false;
    return true;
}

function findAvailableMoves(playGroundArr) {
    let moves = [];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (typeof playGroundArr[row][col] === 'number') moves.push(playGroundArr[row][col])
        }
    }
    return moves;
}

function checkWinner(arr) {
    if((arr[0][0] === arr[0][1]) 
        && (arr[0][0] === arr[0][2]) 
        && (typeof arr[0][0] !== 'number')) {
        return [arr[0][0], 1, 2, 3];

    } else if ((arr[0][0] === arr[1][0]) 
        && (arr[0][0] === arr[2][0]) 
        && (typeof arr[0][0] !== 'number')) {
        return [arr[0][0], 1, 4, 7];

    } else if ((arr[2][0] === arr[2][1]) 
        && (arr[2][0] === arr[2][2]) 
        && (typeof arr[2][0] !== 'number')) {
        return [arr[2][0], 7, 8, 9];

    } else if ((arr[0][2] === arr[1][2]) 
        && (arr[0][2] === arr[2][2]) 
        && (typeof arr[0][2] !== 'number')) {
        return [arr[0][2], 3, 6, 9];

    } else if ((arr[0][1] === arr[1][1]) 
        && (arr[0][1] === arr[2][1]) 
        && (typeof arr[0][1] !== 'number')) {
        return [arr[0][1], 2, 5, 8];

    } else if ((arr[1][0] === arr[1][1]) 
        && (arr[1][0] === arr[1][2]) 
        && (typeof arr[1][0] !== 'number')) {
        return [arr[1][0], 4, 5, 6];

    } else if ((arr[0][0] === arr[1][1]) 
        && (arr[0][0] === arr[2][2]) 
        && (typeof arr[0][0] !== 'number')) {
        return [arr[0][0], 1, 5, 9];

    } else if ((arr[2][0] === arr[1][1]) 
        && (arr[2][0] === arr[0][2]) 
        && (typeof arr[2][0] !== 'number')) {
        return [arr[2][0], 7, 5, 3];

    } else {
        return [null];
    }
}

function doRestart() {

    const winnerScreenWrapper = document.querySelector('.winner__wrapper');
    playGround.innerHTML = `<div class="playground__cell playground__row0_col0"></div>
    <div class="playground__cell playground__row0_col1"></div>
    <div class="playground__cell playground__row0_col2"></div>
    <div class="playground__cell playground__row1_col0"></div>
    <div class="playground__cell playground__row1_col1"></div>
    <div class="playground__cell playground__row1_col2"></div>
    <div class="playground__cell playground__row2_col0"></div>
    <div class="playground__cell playground__row2_col1"></div>
    <div class="playground__cell playground__row2_col2"></div>`;

    playGroundArr = [[1, 2, 3], [4, 5, 6], [7, 8 ,9]];
    turn = true;
    steps = 0;
    cpuFirstStepFlag = true;

    showCurrentTurn(turn);
    winnerScreenWrapper.classList.add('hidden');

    if(currentGameMode) playgroundPvPMode();
    else playgroundPvCMode();
}

function highlightWinnerLine(cell1, cell2, cell3) {
    let [row1, col1] = CELLS_NUMBERS[cell1];
    let [row2, col2] = CELLS_NUMBERS[cell2];
    let [row3, col3] = CELLS_NUMBERS[cell3];
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
        winnerTitleMark.innerHTML = `${winnerMark}`;
        winnerTitleText.innerHTML = 'TAKES THE ROUND';
        setTimeout(() => winnerScreenWrapper.classList.remove('hidden'), 1000);
    } else {
        winnerTitleMark.innerHTML = ``;
        winnerTitleText.innerHTML = 'NO ONE TAKES THE ROUND';
        setTimeout(() => winnerScreenWrapper.classList.remove('hidden'), 100);
    }
    updateScores(winnerMark);
}

function showCurrentTurn(turn) {
    currentTurnSpan.innerHTML = MARK[turn];
}

function cloneArray(arr) {
    let newArr = [];
    for(let i = 0; i < arr.length; i++) {
        newArr.push([]);
        for(let y = 0; y < arr[i].length; y++) {
            newArr[i].push(arr[i][y]);
        }
    }
    return newArr;
}