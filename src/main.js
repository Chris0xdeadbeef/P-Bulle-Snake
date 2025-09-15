/**
 * ETML
 * Auteur initial : Grégory Charmier
 * Date initiale : 29.08.2024
 *
 * Modified by : Christopher Ristic, 01.09.2025   // facultatif, si modifications majeures (> 80% du code)
 *
 * @module  main.js
 * @author  Grégory Charmier
 * Description : Programme principal du jeu Snake.
 */

import { initSnake, moveSnake, drawSnake } from "./snake.js";
import { generateFood, drawFood } from "./food.js";
import { handleDirectionChange } from "./controls.js";
import { checkCollision, checkWallCollision } from "./collision.js";
import { drawScore } from "./score.js";
import { direction as Direction, LAYERS } from "./constantes.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const gameSpeed = 100;
let snake;
let food;
let direction = Direction.RIGHT; // Direction initiale
let score = 0;
let gameInterval; // Variable pour stocker l'identifiant de l'intervalle
let entities = [];// Liste des entités du jeu (murs internes, bonus, etc.)
let isPaused = false; // État de pause du jeu

document.addEventListener("keydown", (event) => {
  direction = handleDirectionChange(event, direction);
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    // bascule pause/reprise
    isPaused = !isPaused;

    if (isPaused) {
      clearInterval(gameInterval);
      drawPauseMessage();
    }
    else {
      gameInterval = setInterval(draw, gameSpeed);
    }

  }
  else {
    direction = handleDirectionChange(event, direction);
  }
});

function drawPauseMessage() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // fond semi-transparent
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = "#FFFFFF"; // texte blanc
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.fillText("PAUSE", canvas.width / 2, canvas.height / 2);
}

function startGame() {
  snake = initSnake(400, 400, box);
  food = generateFood(box, canvas);

  gameInterval = setInterval(draw, gameSpeed); // Stockage de l'identifiant de l'intervalle
}

function draw() {

  moveSnake(snake, direction, box); // Déplacement en premier
  const head = snake[0];

  // Vérifie collisions avec corps et murs
  if (checkCollision(head, snake) || checkWallCollision(head, canvas, box, entities)) {
    clearInterval(gameInterval);
    alert("Game Over !");
    return true;
  }

  // Vérifie si le serpent mange la nourriture
  if (head.x === food.x && head.y === food.y) {
    ++score;

    // Ajoute un nouveau segment au serpent en dupliquant la queue
    const tail = { ...snake[snake.length - 1], layer: LAYERS.SNAKE };
    snake.push(tail);

    food = generateFood(box, canvas);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood(ctx, food, box);
  drawSnake(ctx, snake, box);
  drawScore(ctx, score, 10, 30);
}

startGame();
