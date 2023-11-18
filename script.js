function makePlayer(playerName, markType) {
    return {playerName, markType};
}

const Players = {
    player1: makePlayer('player1', 'X'),
    player2: makePlayer('player2', 'O'),
}

const GameBoard = (function() {
    let boardArray = [
        'X', 'X', 'O',
        null, 'X', 'X',
        'O', null, 'X'
    ];

    const getboardArray = ()=> {
        return boardArray;
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
        console.log(`Marking index: ${index}: ${boardArray[index]}`)
        boardArray[index]=gameLogic.getTurn().markType;
        console.log(`Now index: ${index}: ${boardArray[index]}`)
    }
    return {getboardArray, resetArray, markArray};
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
                ) return boardArray[i*3];
            // Check columns for win
            else if (
                boardArray[i] === boardArray[i+3] &&
                boardArray[i] === boardArray[i+6] &&
                boardArray[i] != null
                ) return boardArray[i];
        }
        // Check \ diagonal for win
        if (
            boardArray[0] === boardArray[4] &&
            boardArray[0] === boardArray[8] &&
            boardArray[0] != null
        ) return boardArray[0];
        // Check / diagonal for win
        else if (
            boardArray[2] === boardArray[4] &&
            boardArray[2] === boardArray[6] &&
            boardArray[2] != null
            ) return boardArray[2];
    }

    return {getTurn, toggleTurn, checkWin};
}) ();

console.log(gameLogic.checkWin());

console.log(GameBoard.getboardArray());
GameBoard.resetArray();
console.log(GameBoard.getboardArray());
GameBoard.markArray(4);
GameBoard.markArray(5);
GameBoard.markArray(3);
console.log(GameBoard.getboardArray())
console.log(gameLogic.checkWin());