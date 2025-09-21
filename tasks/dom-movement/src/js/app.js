import goblinImg from "../img/goblin.png";

export default class Game {
  constructor() {
    this.boardSize = 4;
    this.cells = [];
    this.goblin = null;
    this.currentPosition = -1;
    this.intervalId = null;
    this.isGameRunning = false;

    this.init();
  }

  init() {
    this.createGameBoard();
    this.createGoblin();
    this.bindEvents();
    this.placeGoblinRandomly();
  }

  createGameBoard() {
    const gameBoard = document.getElementById("game-board");

    // Создаем 16 ячеек для поля 4x4
    for (let i = 0; i < this.boardSize * this.boardSize; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.index = i;
      gameBoard.appendChild(cell);
      this.cells.push(cell);
    }
  }

  createGoblin() {
    this.goblin = document.createElement("img");
    this.goblin.src = goblinImg;
    this.goblin.className = "goblin";
    this.goblin.alt = "Goblin";
  }

  placeGoblinRandomly() {
    let newPosition;

    // Выбираем новую позицию, отличную от текущей
    do {
      newPosition = Math.floor(Math.random() * this.cells.length);
    } while (newPosition === this.currentPosition);

    // Убираем гоблина с предыдущей позиции
    if (this.currentPosition !== -1) {
      this.cells[this.currentPosition].classList.remove("active");
    }

    // Размещаем гоблина в новой позиции
    this.currentPosition = newPosition;
    const targetCell = this.cells[this.currentPosition];

    // Важно: используем appendChild для перемещения элемента
    // Это автоматически удалит элемент из предыдущего родителя
    targetCell.appendChild(this.goblin);
    targetCell.classList.add("active");
  }

  startGame() {
    if (this.isGameRunning) return;

    this.isGameRunning = true;
    document.getElementById("start-game").disabled = true;
    document.getElementById("stop-game").disabled = false;

    // Перемещаем гоблина каждые 1000ms (1 секунда)
    this.intervalId = setInterval(() => {
      this.placeGoblinRandomly();
    }, 1000);
  }

  stopGame() {
    if (!this.isGameRunning) return;

    this.isGameRunning = false;
    document.getElementById("start-game").disabled = false;
    document.getElementById("stop-game").disabled = true;

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  bindEvents() {
    document.getElementById("start-game").addEventListener("click", () => {
      this.startGame();
    });

    document.getElementById("stop-game").addEventListener("click", () => {
      this.stopGame();
    });

    // Добавляем обработчик кликов по ячейкам (для будущего расширения)
    this.cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (index === this.currentPosition) {
          console.log("Попадание! Гоблин пойман!");
          // Здесь можно добавить логику подсчета очков
        }
      });
    });
  }
}
