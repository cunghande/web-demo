const gameBoard = document.getElementById('game-board');
const currentPlayerText = document.getElementById('current-player');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X'; // Người chơi hiện tại: X hoặc O
let gameState = Array(10).fill(null).map(() => Array(10).fill('')); // Ma trận 10x10

// Tạo bảng game
function createBoard() {
  gameBoard.innerHTML = ''; // Xóa nội dung cũ
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener('click', handleCellClick);
      gameBoard.appendChild(cell);
    }
  }
}

// Xử lý khi nhấn vào ô
function handleCellClick(event) {
  const row = event.target.dataset.row;
  const col = event.target.dataset.col;

  // Kiểm tra ô đã được chọn chưa
  if (gameState[row][col] !== '') return;

  // Cập nhật trạng thái ô
  gameState[row][col] = currentPlayer;
  event.target.textContent = currentPlayer;

  // Thêm màu sắc cho X và O
  if (currentPlayer === 'X') {
    event.target.classList.add('x-player');
  } else {
    event.target.classList.add('o-player');
  }

  // Kiểm tra chiến thắng
  if (checkWin(row, col, currentPlayer)) {
    alert(`Player ${currentPlayer} wins!`);
    resetGame();
    return;
  }

  // Chuyển lượt
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Kiểm tra chiến thắng (hàng, cột, chéo)
function checkWin(row, col, player) {
  row = parseInt(row);
  col = parseInt(col);

  // Kiểm tra theo hàng
  if (
    gameState[row].slice(col - 4, col + 5).filter(cell => cell === player).length >= 5
  ) return true;

  // Kiểm tra theo cột
  let count = 0;
  for (let i = Math.max(0, row - 4); i <= Math.min(9, row + 4); i++) {
    count = gameState[i][col] === player ? count + 1 : 0;
    if (count >= 5) return true;
  }

  // Kiểm tra chéo trái
  count = 0;
  for (let i = -4; i <= 4; i++) {
    if (
      gameState[row + i] &&
      gameState[row + i][col + i] === player
    ) {
      count++;
      if (count >= 5) return true;
    } else {
      count = 0;
    }
  }

  // Kiểm tra chéo phải
  count = 0;
  for (let i = -4; i <= 4; i++) {
    if (
      gameState[row + i] &&
      gameState[row + i][col - i] === player
    ) {
      count++;
      if (count >= 5) return true;
    } else {
      count = 0;
    }
  }

  return false;
}

// Reset game
function resetGame() {
  currentPlayer = 'X';
  currentPlayerText.textContent = "Player X's Turn";
  gameState = Array(10).fill(null).map(() => Array(10).fill(''));
  createBoard();
}

// Khởi tạo bảng game khi load trang
createBoard();
resetButton.addEventListener('click', resetGame);
