const X_MARKER = "X"; // Constant for X marker
const O_MARKER = "O"; // Constant for O marker

let currentPlayer = X_MARKER; // Variable to track current player
let cells = Array.from(document.getElementsByClassName('box')); // Array of all game cells

let gameTitle = document.getElementById('gameTitle'); // Title of the game
let resetButton = document.getElementById('resetButton'); // Restart button

let winnerColor = getComputedStyle(document.body).getPropertyValue('--winning-blocks'); // Color for winning cells

let spaces = Array(9).fill(null); // Array to track game state (empty cells)

// Function to start the game
const startGame = () => {
    cells.forEach(cell => cell.addEventListener('click', handleCellClick)); // Add event listeners to cells
}

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Function to check for a winner
function checkWinner() {
    for (const combo of winningCombinations) {
        let [a, b, c] = combo;

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]; // Return winning cells
        }
    }
    return false; // Return false if no winner
}

// Event handler for cell clicks
function handleCellClick(e) {
    const id = e.target.id.substring(4); // Get cell ID

    if(!spaces[id]){
        spaces[id] = currentPlayer; // Update game state with current player's marker
        e.target.innerText = currentPlayer; // Update cell text with current player's marker

        if(checkWinner() !==false){
            gameTitle.innerHTML = `${currentPlayer} wins!`; // Display winner message
            let winningCells = checkWinner(); // Get winning cells

            winningCells.map( cell => cells[cell].style.backgroundColor = winnerColor); // Highlight winning cells
            return;
        }

        currentPlayer = currentPlayer == X_MARKER ? O_MARKER : X_MARKER; // Switch to next player
    }
}

// Function to reset the game
function resetGame() {
    spaces.fill(null); // Reset game state
    cells.forEach( cell => {
        cell.innerText = ''; // Clear cell text
        cell.style.backgroundColor=''; // Reset cell background color
    });

    gameTitle.innerHTML = 'Tic Tac Toe'; // Reset game title

    currentPlayer = X_MARKER; // Reset current player
}

startGame(); // Start the game

// Event listener for reset button
resetButton.addEventListener('click', resetGame);
