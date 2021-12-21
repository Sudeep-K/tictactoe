/* Creating an object for the gameboard */
const Gameboard = (function() {
    let player_turn = "player_1";

    /* stores how many times have the game been draw */
    draw = 0;

    /* array of places filled up by the players */
    let global_places = [];
    let refer_places = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

    /* horizontal arrays of places in gameboard
     * to check whether there is win move or not? 
     */
    let horiz_1 = ["one", "two", "three"];
    let horiz_2 = ["four", "five", "six"];
    let horiz_3 = ["seven", "eight", "nine"];

    /* vertical arrays of places in gameboard
     * to check whether there is win move or not? 
     */
    let vert_1 = ["one", "four", "seven"];
    let vert_2 = ["two", "five", "eight"];
    let vert_3 = ["three", "six", "nine"];

    /* diagonal arrays of places in gameboard
     * to check whether there is win move or not? 
     */
    let diag_1 = ["one", "five", "nine"];
    let diag_2 = ["three", "five", "seven"];

    const isLegal = (playerInput) => {

        /*
         * this function check for if the player input
         * inside the gameboard is legal or not??
         */

        if (global_places.includes(playerInput)) {
            return true;
        }
        else {
            return false;
        }
    }

    const contains = (array1,array2) => {
        for (let i = 0; i < array1.length; i++) {
            let index = array1.indexOf(array2[i]);
            if (index == -1) {
                return false;
            }
        }
        return true;
    }

    const hasWon = (player_x) => {
        if (contains(horiz_1, player_x)) {
            return true;
        }
        else if (contains(horiz_2, player_x)) {
            /* some player won the game */
            return true;
        }
        else if (contains(horiz_3, player_x)) {
            /* some player won the game */
            return true;
        }
        else if (contains(vert_1, player_x)) {
            /* some player won the game */
            return true;
        }
        else if (contains(vert_2, player_x)) {
            /* some player won the game */
            return true;
        }
        else if (contains(vert_3, player_x)) {
            /* some player won the game */
            return true;
        }
        else if (contains(diag_1, player_x)) {
            /* some player won the game */
            return true;
        }
        else if (contains(diag_2, player_x)) {
            /* some player won the game */
            return true;
        }
        else {
            return false;
        }
    }

    const isDraw = (a, b) => {
        return a.length === b.length &&
        a.every((val, index) => val === b[index]);
    }

    const gameWon = () => {
        /* displays gamewon and adds to score of either player */
    }

    const displayScores = () => {
        /* displays the score to the window */
        let player_1Score = document.querySelector(".player-x .value");
        let player_2Score = document.querySelector(".player-o .value");
        let drawScore = document.querySelector(".draw .value");

        player_1Score.textContent = player_1.player_score;
        player_2Score.textContent = player_2.player_score;
        drawScore.textContent = draw;
    }

    const clearBoard = () => {
        /* clears the board after each match is completed */
        global_places = [];
        player_1.playerChoice = [];
        player_2.playerChoice = [];
        let image_childNodes = document.querySelectorAll(".box img");
        image_childNodes.forEach(function(child_img) {
            child_img.parentNode.removeChild(child_img);
        });
    }

    return {
        hasWon,
        player_turn: player_turn,
        isLegal: isLegal,
        global_places: global_places,
        displayScores,
        clearBoard,
        isDraw,
        refer_places,
        draw,
    };
}) ();

/* Creating an object for player */
const Player = () => {
    let playerChoice = [];
    let player_score = 0;
    const drawonBox = (box) => {
        let childNode = document.createElement("img");

        if (Gameboard.player_turn == 'player_1') {
            childNode.setAttribute('src', './cross.png');
        }
        else {
            childNode.setAttribute('src', './circle.png');
        }

        childNode.setAttribute('height', '100px');
        childNode.setAttribute('width', '100px');
        box.appendChild(childNode);
    }
    return {
        playerChoice,
        player_score,
        drawonBox,
    }
}

const player_1 = Player();
const player_2 = Player();

/* adding event listener to each of the gameboard components */
const boxes = document.querySelectorAll(".box");

boxes.forEach(function (box) {
    
    box.addEventListener("click", function () {
        
        /* 
         * call the gameboard to check whether the move is legal or not
         */

        if (Gameboard.player_turn == "player_1") {

            Gameboard.displayScores();
            
            if (!Gameboard.isLegal(box.id)) {
                
                /* if the move is legal then push the choice to array */
                player_1.playerChoice.push(box.id);
                Gameboard.global_places.push(box.id);

                if (Gameboard.isDraw(Gameboard.global_places, Gameboard.refer_places)) {
                    /* checks if the game is draw */
                    Gameboard.draw += 1;
                    Gameboard.displayScores();
                    Gameboard.clearBoard();
                }

                /* checks if the player has won the game */
                if (!Gameboard.hasWon(player_1.playerChoice)) {
                    player_1.drawonBox(box);
                    Gameboard.player_turn = 'player_2';
                }
                else {
                    /* display gamewon screen */
                    player_1.drawonBox(box);
                    alert(`Gamewon by ${Gameboard.player_turn}!!`);
                    player_1.player_score += 1;
                    Gameboard.displayScores();
                    Gameboard.clearBoard();
                }
            }
        }
        else if (Gameboard.player_turn == "player_2") {
            
            Gameboard.displayScores();
            if (Gameboard.isDraw(Gameboard.global_places, Gameboard.refer_places)) {
                /* checks if the game is draw */
                Gameboard.draw += 1;
                Gameboard.displayScores();
                Gameboard.clearBoard();
            }

            if (!Gameboard.isLegal(box.id)) {
                
                /* if the move is legal then push the choice to array */
                player_2.playerChoice.push(box.id);
                Gameboard.global_places.push(box.id);

                if (Gameboard.isDraw(Gameboard.global_places, Gameboard.refer_places)) {
                    /* checks if the game is draw */
                    Gameboard.draw += 1;
                    Gameboard.displayScores();
                    Gameboard.clearBoard();
                }

                /* checks if the player has won the game */
                if (!Gameboard.hasWon(player_2.playerChoice)) {
                    player_2.drawonBox(box);
                    Gameboard.player_turn = 'player_1';
                }
                else {
                    /* display gamewon screen */
                    player_2.drawonBox(box);
                    alert(`Gamewon by ${Gameboard.player_turn}!!`);
                    player_2.player_score += 1;
                    Gameboard.displayScores();
                    Gameboard.clearBoard();
                }
            }
        }
    });
});