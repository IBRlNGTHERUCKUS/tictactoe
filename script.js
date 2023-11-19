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
    return {getScore, incrementScore};
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

    return {getTurn, toggleTurn, checkWin};
}) ();

const boardCellElements = document.querySelectorAll('.board-grid');
const p1ScoreElement = document.querySelector('.player1');
const p2ScoreElement = document.querySelector('.player2');
function update() {
    let i = 0;
    for (let element of boardCellElements) {
        element.textContent=GameBoard.getboardArray()[i];
        i++;
    }
    p1ScoreElement.textContent = `${Players.player1.playerName} 
     (${Players.player1.markType}): ${ScoreBoard.getScore(Players.player1)}`;
    p2ScoreElement.textContent = `${Players.player2.playerName} 
    (${Players.player2.markType}): ${ScoreBoard.getScore(Players.player2)}`;
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
            update();
            ScoreBoard.incrementScore(gameLogic.getTurn());
            GameBoard.resetArray();
            setTimeout(update, 500);
            return;
        }
        //Check for a draw
        else if (GameBoard.isFull()) {
            GameBoard.resetArray();
        }
        gameLogic.toggleTurn();
        update();
    }
}

for (let element of boardCellElements) {
    element.addEventListener('click', handleCellClick)
}