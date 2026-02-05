const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetBtn = document.getElementById("reset");
const turnText = document.getElementById("turn");

let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function checkWin() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");
      message.textContent = `🎉 Player ${currentPlayer} Wins!`;
      gameActive = false;
      return;
    }
  }

  if ([...cells].every(cell => cell.textContent !== "")) {
    message.textContent = "🤝 It's a Draw!";
    gameActive = false;
  }
}

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.textContent !== "") return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    checkWin();

    if (gameActive) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      turnText.textContent = currentPlayer;
    }
  });
});

resetBtn.addEventListener("click", () => {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.className = "cell";
  });

  currentPlayer = "X";
  gameActive = true;
  message.textContent = "";
  turnText.textContent = currentPlayer;
});
