const GameBoard = (function() {
    let boardArray = [
        'O', 'X', 'O',
        null, 'X', 'X',
        'O', null, 'X'
    ]

    return {boardArray};
}) ();

const gameLogic = (function() {
    const checkWin = ()=> {
        let boardArray=GameBoard.boardArray;
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

    return {checkWin};
}) ();

console.log(gameLogic.checkRows());