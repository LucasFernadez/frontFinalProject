const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let scoreX = 0;
let scoreO = 0;

const checkWinner = () => {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]) {
      const winner = gameBoard[a];
      alert(`${winner} gana!`);
      if (winner === 'X') {
        scoreX++;
        document.getElementById('score-X').textContent = `X: ${scoreX}`;
      } else {
        scoreO++;
        document.getElementById('score-O').textContent = `O: ${scoreO}`;
      }
      gameOver = true;
      window.parent.postMessage({ result: winner }, window.location.origin);
      return;
    }
  }

  if (!gameBoard.includes('')) {
    alert('Empate!');
    gameOver = true;
  
    window.parent.postMessage({ result: 'draw' }, window.location.origin);
  }
};

const handleClick = (e) => {
  const index = e.target.dataset.index;
  if (!gameBoard[index] && !gameOver) {
    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer);
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
};

const resetGame = () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X','O');
  });
  currentPlayer = 'X';
};

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);

cells.forEach(cell => cell.addEventListener('click', handleClick));
