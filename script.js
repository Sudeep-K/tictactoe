/* Creating an object for the gameboard */
const Gameboard = (function() {
    let player_turn = "player_1";

    /* array of places filled up by the players */
    let global_places = [];

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

    const gameWon = () => {
        /* displays gamewon and adds to score of either player */
    }

    return {
        hasWon,
        player_turn: player_turn,
        isLegal: isLegal,
        global_places: global_places
    };
}) ();

/* Creating an object for player */
const Player = () => {
    let playerChoice = [];
    const drawonBox = () => {
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
        

        if (Gameboard.player_turn == 'player_1') {
            Gameboard.player_turn = 'player_2';
        }
        else {
            Gameboard.player_turn = 'player_1';
        }
    }
    return {
        playerChoice,
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
            
            if (!Gameboard.isLegal(box.id)) {
                
                /* if the move is legal then push the choice to array */
                player_1.playerChoice.push(box.id);
                Gameboard.global_places.push(box.id);

                /* checks if the player has won the game */
                if (!Gameboard.hasWon(player_1.playerChoice)) {
                    let childNode = document.createElement("img");
                    childNode.setAttribute('src', './cross.png');
                    childNode.setAttribute('height', '100px');
                    childNode.setAttribute('width', '100px');
                    box.appendChild(childNode);
                    
                }
                else {
                    /* display gamewon screen */
                    let childNode = document.createElement("img");
                    childNode.setAttribute('src', './cross.png');
                    childNode.setAttribute('height', '100px');
                    childNode.setAttribute('width', '100px');
                    box.appendChild(childNode);
                    alert(`Gamewon by ${Gameboard.player_turn}!!`);
                }
            }
        }
        else if (Gameboard.player_turn == "player_2") {
            
            if (!Gameboard.isLegal(box.id)) {
                
                /* if the move is legal then push the choice to array */
                player_2.playerChoice.push(box.id);
                Gameboard.global_places.push(box.id);

                /* checks if the player has won the game */
                if (!Gameboard.hasWon(player_2.playerChoice)) {
                    let childNode = document.createElement("img");
                    childNode.setAttribute('src', './circle.png');
                    childNode.setAttribute('height', '100px');
                    childNode.setAttribute('width', '100px');
                    box.appendChild(childNode);
                    Gameboard.player_turn = 'player_1';
                }
                else {
                    /* display gamewon screen */
                    let childNode = document.createElement("img");
                    childNode.setAttribute('src', './circle.png');
                    childNode.setAttribute('height', '100px');
                    childNode.setAttribute('width', '100px');
                    box.appendChild(childNode);
                    alert(`Gamewon by ${Gameboard.player_turn}!!`);
                }
            }

        }
    });
});