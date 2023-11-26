function makePlayer(playerName, markType) {
    return {playerName, markType};
}

const Players = {
    player1: makePlayer('Player 1', 'X'),
    player2: makePlayer('Player 2', 'O'),
}

const ScoreBoard = (function() {
    let player1Score = 0;
    let player2Score = 0;
    const getScore = (player)=> {
        if (player === Players.player1) {
            return player1Score;
        }
        else {
            return player2Score;
        }
    }
    const incrementScore = (player)=> {
        if (player === Players.player1) {
            player1Score++;
        }
        else {
            player2Score++;
        }

    }
    const resetScore = ()=> {
        player1Score=0;
        player2Score=0;
    }
    return {getScore, incrementScore, resetScore};
}
) ();

const GameBoard = (function() {
    let boardArray = [      //private
        'T', 'I', 'C',
        'T', 'A', 'C',
        'T', 'O', 'E'
    ];

    const getboardArray = ()=> {
        return boardArray;
    }

    const isFull = ()=> {
        for (let i=0; i<9; i++) {
            if (!boardArray[i]) {
                return false
            }
        }
        return true;
    }

    const resetArray = () => {
        //Not sure why GameBoard. is required ???
        boardArray = [
            null, null, null,
            null, null, null,
            null, null, null
        ]
    };
    const markArray= (index)=> {
        boardArray[index]=gameLogic.getTurn().markType;
    }
    return {getboardArray, resetArray, markArray, isFull};
}) ();

const gameLogic = (function() {
    let whosTurn = Players.player1;   //private
    const getTurn = ()=> {
        return whosTurn;
    }
    const toggleTurn = () =>{
        if (whosTurn == Players.player1) {
            whosTurn = Players.player2;
        }
        else {
            whosTurn = Players.player1;
        }
    }
    const checkWin = ()=> {
        let boardArray=GameBoard.getboardArray();
        for (let i=0; i<3; i++) {
            // Check rows for win
            if (
                boardArray[i*3] === boardArray[i*3+1] &&
                boardArray[i*3] === boardArray[i*3+2] &&
                boardArray[i*3] != null
                ) return true;
            // Check columns for win
            else if (
                boardArray[i] === boardArray[i+3] &&
                boardArray[i] === boardArray[i+6] &&
                boardArray[i] != null
                ) return true;
        }
        // Check \ diagonal for win
        if (
            boardArray[0] === boardArray[4] &&
            boardArray[0] === boardArray[8] &&
            boardArray[0] != null
        ) return true;
        // Check / diagonal for win
        else if (
            boardArray[2] === boardArray[4] &&
            boardArray[2] === boardArray[6] &&
            boardArray[2] != null
            ) return true;
    }

    const resetGame = ()=> {
        whosTurn = Players.player1;
        GameBoard.resetArray();
        ScoreBoard.resetScore();
        update();
    }

    return {getTurn, toggleTurn, checkWin, resetGame};
}) ();

////////////////////////////// Dom manipulation /////////////////

const boardCellElements = document.querySelectorAll('.board-grid');
const p1ScoreElement = document.querySelector('.player1');
const p2ScoreElement = document.querySelector('.player2');
const turnIndicatorElement = document.querySelector('.turn-indicator');
function update(condition=null) {
    let i = 0;
    for (let element of boardCellElements) {
        element.textContent=GameBoard.getboardArray()[i];
        i++;
    }
    p1ScoreElement.textContent = `${Players.player1.playerName} 
     (${Players.player1.markType}): ${ScoreBoard.getScore(Players.player1)}`;
    p2ScoreElement.textContent = `${Players.player2.playerName} 
    (${Players.player2.markType}): ${ScoreBoard.getScore(Players.player2)}`;

    // 
    if (condition === 'win') {
        turnIndicatorElement.textContent = `${gameLogic.getTurn().playerName} (${gameLogic.getTurn().markType}) wins!`
    }
    else if (condition === 'draw') {
        turnIndicatorElement.textContent = 'It\'s a tie!'
    }
    else {
        turnIndicatorElement.textContent = `${gameLogic.getTurn().markType}'s turn`
    }
}
update();
GameBoard.resetArray();
setTimeout(update, 3000);


function handleCellClick(e) {
    let index = e.target.dataset.index;
    console.log(e.target.dataset.index)
    const boardArray = GameBoard.getboardArray();
    // if the spot is already taken do nothing
    if (boardArray[index] != null) {
        return;
    }
    else {
        GameBoard.markArray(index);
        //Check for a win
        if (gameLogic.checkWin()) {
            update('win');
            ScoreBoard.incrementScore(gameLogic.getTurn());
            GameBoard.resetArray();

            gameLogic.toggleTurn();
            setTimeout(update, 1400);
            return;
        }
        //Check for a draw
        else if (GameBoard.isFull()) {
            GameBoard.resetArray();
            gameLogic.toggleTurn();
            update('draw');
            setTimeout(update, 1400);
            return;
        }
        gameLogic.toggleTurn();
        update();
    }
}

for (let element of boardCellElements) {
    element.addEventListener('click', handleCellClick)
}

// Make name editing boxes synched with displayed names
let inputs = document.querySelectorAll('input');
inputs[0].addEventListener('input', (e)=>{
    Players.player1.playerName = e.target.value;
    update();
})
inputs[1].addEventListener('input', (e)=>{
    Players.player2.playerName = e.target.value;
    update();
})

// Reset button
const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', gameLogic.resetGame);