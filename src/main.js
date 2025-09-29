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

import { initSnake, getNewHead, drawSnake, applyMove } from "./snake.js";
import { generateFood, drawFood } from "./food.js";
import { handleDirectionChange } from "./controls.js";
import { checkCollision, checkWallCollision } from "./collision.js";
import { drawScore } from "./score.js";
import { direction as Direction, LAYERS } from "./constantes.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const gameSpeed = 150;
let snake;
let food;
let direction = Direction.RIGHT; // Direction initiale
let score = 0;
let gameInterval; // Variable pour stocker l'identifiant de l'intervalle
let entities = [];// Liste des entités du jeu (murs internes, bonus, etc.)
let isPaused = false; // État de pause du jeu
let startTime;        // Timestamp du début de la partie
let elapsedTime = 0;  // Temps écoulé en secondes
let timerInterval;    // Intervalle pour mettre à jour le chrono

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
  
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.fillText("PAUSE", canvas.width / 2, canvas.height / 2);
}

function startGame() {
  snake = initSnake(400, 400, box);
  food = generateFood(box, canvas);
  startTimer();
  gameInterval = setInterval(draw, gameSpeed); // Stockage de l'identifiant de l'intervalle
}

function draw() {

  const newHead = getNewHead(snake, direction, box);

  // Vérifie collisions avant de bouger
  if (checkCollision(newHead, snake) || checkWallCollision(newHead, canvas, box, entities)) {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    alert("Game Over !");
    return true;
  }

  // Applique le déplacement si pas de collision
  applyMove(snake, newHead);

  // Vérifie si le serpent mange la nourriture
  if (newHead.x === food.x && newHead.y === food.y) {
    ++score;

    // Ajoute un segment à la fin
    const tail = { ...snake[snake.length - 1], layer: LAYERS.SNAKE };
    snake.push(tail);

    food = generateFood(box, canvas);
  }

  // Nettoyage et dessin
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawTimer(ctx);
  drawFood(ctx, food, box);
  drawSnake(ctx, snake, box);
  drawScore(ctx, score, 100, 20);
}

function startTimer() {
  startTime = Date.now() - elapsedTime * 1000; // Reprendre si pause
  timerInterval = setInterval(() => {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  }, 1000);
}

function drawTimer(ctx) {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.textAlign = "right";
  ctx.fillText(`Temps: ${elapsedTime}s`, canvas.width - 40, 20);
}



startGame();
