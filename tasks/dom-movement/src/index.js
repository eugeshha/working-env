import "./css/style.css";
import Game from "./js/app";

// Инициализация игры после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();

  // Делаем игру доступной глобально для отладки
  window.game = game;
});
