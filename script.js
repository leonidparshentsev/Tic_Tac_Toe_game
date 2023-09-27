const playGround = document.querySelector('.game_playground');
const currentTurnSpan = document.querySelector('.game_turn__span');
const restart = document.querySelector('.button_restart');
let playGroundArr = [[], [], []];
let steps = 0;

let turn = true;
currentTurnSpan.innerHTML = turn ? 1 : 0;

playGround.addEventListener('click', (event) => {
    let target = event.target;
    let targetClass = target.classList[1];
    let [row, col] = targetClass.match(/\d+/ig);
    steps++;

    if(playGroundArr[row - 1][col - 1] === undefined) {
        playGroundArr[row - 1][col - 1] = turn ? 1 : 0;
        target.innerHTML = turn ? 1 : 0;
        turn = !turn;
        currentTurnSpan.innerHTML = turn ? 1 : 0;
    }

    if(steps > 4) {
        if(checkWinner(playGroundArr) !== null) {
            doRestart();
        }
    } 
    if(steps > 8) {
        doRestart();
    }

});

restart.addEventListener('click', (event) => {
    doRestart();
});

function checkWinner(arr) {
    if((arr[0][0] === arr[0][1]) && (arr[0][0] === arr[0][2]) && arr[0][0] !== undefined) {
        console.log('here1');
        return arr[0][0];

    } else if ((arr[0][0] === arr[1][0]) && (arr[0][0] === arr[2][0]) && arr[0][0] !== undefined) {
        console.log('here2');
        return arr[0][0];

    } else if ((arr[2][0] === arr[2][1]) && (arr[2][0] === arr[2][2]) && arr[2][0] !== undefined) {
        console.log('here3');
        return arr[2][0];

    } else if ((arr[0][2] === arr[1][2]) && (arr[0][2] === arr[2][2]) && arr[0][2] !== undefined) {
        console.log('here4');
        return arr[0][2];

    } else if ((arr[0][1] === arr[1][1]) && (arr[0][1] === arr[2][1]) && arr[0][1] !== undefined) {
        console.log('here5');
        return arr[0][1];

    } else if ((arr[1][0] === arr[1][1]) && (arr[1][0] === arr[1][2]) && arr[1][0] !== undefined) {
        console.log('here6');
        return arr[1][0];

    } else if ((arr[0][0] === arr[1][1]) && (arr[0][0] === arr[2][2]) && arr[0][0] !== undefined) {
        console.log('here7');
        return arr[0][0];

    } else if ((arr[2][0] === arr[1][1]) && (arr[2][0] === arr[0][2]) && arr[2][0] !== undefined) {
        console.log('here8');
        return arr[2][0];

    } else {
        return null;
    }
}

function doRestart() {
    playGround.innerHTML = `<div class="playground_cell playground_row1_col1"></div>
    <div class="playground_cell playground_row1_col2"></div>
    <div class="playground_cell playground_row1_col3"></div>
    <div class="playground_cell playground_row2_col1"></div>
    <div class="playground_cell playground_row2_col2"></div>
    <div class="playground_cell playground_row2_col3"></div>
    <div class="playground_cell playground_row3_col1"></div>
    <div class="playground_cell playground_row3_col2"></div>
    <div class="playground_cell playground_row3_col3"></div>`
    
    playGroundArr = [[], [], []];
    turn = true;
    currentTurnSpan.innerHTML = turn ? 1 : 0;
    steps = 0;
}