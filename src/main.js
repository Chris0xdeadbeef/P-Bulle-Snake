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
import {direction as Direction, LAYERS} from "./constantes.js";

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

document.addEventListener("keydown", (event) => {
  direction = handleDirectionChange(event, direction);
});

function startGame() {
  snake = initSnake(400, 400, box);
  food = generateFood(box, canvas);

  gameInterval = setInterval(draw, gameSpeed); // Stockage de l'identifiant de l'intervalle
}

function draw() {

  //Efface tout le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const head = snake[0];

  drawScore(ctx, score, 10, 30);
  drawSnake(ctx, snake, box);
  moveSnake(snake, direction, box);
  
   // Vérifie collisions et game over
  if (checkCollision(head, snake) || checkWallCollision(head, canvas, box, entities)) {
    clearInterval(gameInterval);
    alert("Game Over !");
    return;
  }

  
}

startGame();
