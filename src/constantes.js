/**
 * ETML
 * Auteur initial : Christopher Ristic
 * Date initiale : 08.09.2025
 *
 * @module  constantes.js
 * @author  Christopher Ristic
 *
 * Description : Bibliothèque pour gérer les constantes.
 */

const direction = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT"
};

const arrowKey = {
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight"
};

const snakeHeadColor = "green";
const snakeBodyColor = "lightgreen";
const foodColor = "red";

const LAYERS = {
  NONE: 0x0000,
  FOOD: 0x0001, // 0001
  WALL: 0x0002, // 0010
  SNAKE: 0x0008  // 1000
};

export { LAYERS, foodColor, snakeHeadColor, snakeBodyColor, direction, arrowKey };