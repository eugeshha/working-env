import Game from "./app";

describe("Game", () => {
  let game;

  beforeEach(() => {
    // Настраиваем DOM
    document.body.innerHTML = `
      <div class="container">
        <h1>Игра "Поймай гнома"</h1>
        <div class="game-board" id="game-board">
        </div>
        <div class="controls">
          <button id="start-game">Старт</button>
          <button id="stop-game">Стоп</button>
        </div>
      </div>
    `;

    game = new Game();
  });

  afterEach(() => {
    if (game && game.intervalId) {
      clearInterval(game.intervalId);
    }
  });

  test("should create game board with 16 cells", () => {
    const cells = document.querySelectorAll(".cell");
    expect(cells.length).toBe(16);
  });

  test("should create goblin element", () => {
    expect(game.goblin).toBeTruthy();
    expect(game.goblin.tagName).toBe("IMG");
    expect(game.goblin.className).toBe("goblin");
  });

  test("should place goblin in random position", () => {
    const initialPosition = game.currentPosition;
    expect(initialPosition).toBeGreaterThanOrEqual(0);
    expect(initialPosition).toBeLessThan(16);

    const activeCell = document.querySelector(".cell.active");
    expect(activeCell).toBeTruthy();
    expect(activeCell.contains(game.goblin)).toBe(true);
  });

  test("should move goblin to different position", () => {
    const initialPosition = game.currentPosition;

    // Вызываем перемещение
    game.placeGoblinRandomly();

    const newPosition = game.currentPosition;
    expect(newPosition).not.toBe(initialPosition);
    expect(newPosition).toBeGreaterThanOrEqual(0);
    expect(newPosition).toBeLessThan(16);
  });

  test("should start and stop game", () => {
    const startButton = document.getElementById("start-game");
    const stopButton = document.getElementById("stop-game");

    // Запускаем игру
    game.startGame();
    expect(game.isGameRunning).toBe(true);
    expect(startButton.disabled).toBe(true);
    expect(stopButton.disabled).toBe(false);
    expect(game.intervalId).toBeTruthy();

    // Останавливаем игру
    game.stopGame();
    expect(game.isGameRunning).toBe(false);
    expect(startButton.disabled).toBe(false);
    expect(stopButton.disabled).toBe(true);
    expect(game.intervalId).toBe(null);
  });

  test("should not start game if already running", () => {
    game.startGame();
    const firstIntervalId = game.intervalId;

    // Пытаемся запустить еще раз
    game.startGame();
    expect(game.intervalId).toBe(firstIntervalId);
  });

  test("should handle cell clicks", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    // Кликаем по ячейке с гоблином
    const activeCell = document.querySelector(".cell.active");
    activeCell.click();

    expect(consoleSpy).toHaveBeenCalledWith("Попадание! Гоблин пойман!");

    consoleSpy.mockRestore();
  });
});
