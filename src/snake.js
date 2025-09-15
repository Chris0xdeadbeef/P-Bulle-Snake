/**
 * ETML
 * Auteur initial : Grégory Charmier
 * Date initiale : 29.08.2024
 *
 * Modified by : Christopher Ristic, 01.09.2025   // facultatif, si modifications majeures (> 80% du code)
 *
 * @module  snake.js
 * @author  Grégory Charmier
 *
 * Description : Bibliothèque pour gérer le serpent dans le jeu Snake.
 */

import { direction as Direction, snakeBodyColor, snakeHeadColor } from "./constantes";

/**
 * Initialise le serpent au début du jeu.
 *
 * Cette fonction crée le serpent en tant que tableau contenant un seul segment,
 * positionné à une position de départ définie sur la grille.
 *
 * @param {number} canvasWidth - Largeur du canvas en pixels, utilisée pour centrer le serpent.
 * @param {number} canvasHeight - Hauteur du canvas en pixels, utilisée pour centrer le serpent.
 * @param {number} box - Taille d'une case de la grille en pixels, utilisée pour positionner correctement le serpent.
 * @returns {Array<{x: number, y: number}>} - Un tableau contenant un objet représentant la position du premier segment du serpent.
 */

function initSnake(canvasWidth, canvasHeight, box) {
  // Position de départ : centre du canvas
  const startX = Math.floor(canvasWidth / 2 / box) * box;
  const startY = Math.floor(canvasHeight / 2 / box) * box;

  // Le serpent est un tableau de segments
  return [{ x: startX, y: startY }];  
}

/**
 * Déplace le serpent dans la direction actuelle.
 *
 * Cette fonction calcule la nouvelle position de la tête du serpent en fonction
 * de la direction actuelle (gauche, haut, droite, bas). Le reste du corps du serpent
 * suit la tête. La fonction retourne un objet représentant la nouvelle position de la tête du serpent.
 *
 * @param {Array<{x: number, y: number}>} snake - Le tableau représentant le serpent, où chaque élément est un segment avec des coordonnées `x` et `y`.
 * @param {string} direction - La direction actuelle du mouvement du serpent ("LEFT", "UP", "RIGHT", ou "DOWN").
 * @param {number} box - La taille d'une case de la grille en pixels, utilisée pour déterminer la distance de déplacement du serpent.
 * @returns {{x: number, y: number}} - Un objet représentant les nouvelles coordonnées `x` et `y` de la tête du serpent après le déplacement.
 */
function moveSnake(snake, direction, box) {
  // Trouver la tête actuelle
  const head = snake[0];
  let newHead;

  // Calculer la nouvelle position de la tête selon direction
  switch (direction) {
    case Direction.UP:
      newHead = {
        x: head.x,
        y: head.y - box
      };
      break;

    case Direction.DOWN:
      newHead = {
        x: head.x,
        y: head.y + box
      };
      break;

    case Direction.LEFT:
      newHead = {
        x: head.x - box,
        y: head.y
      };
      break;

    case Direction.RIGHT:
      newHead = {
        x: head.x + box,
        y: head.y
      };
      break;
  }

  // Ajouter la nouvelle tête au début du tableau
  snake.unshift(newHead);

  // Enlever le dernier segment
  snake.pop();

  // Retourner la nouvelle tête
  return newHead;
}

/**
 * Dessine le serpent sur le canvas.
 *
 * Cette fonction parcourt chaque segment du serpent et le dessine sur le canvas en utilisant
 * un rectangle coloré. La tête du serpent est dessinée dans une couleur différente des autres segments
 * pour la distinguer visuellement. Chaque segment est dessiné à sa position actuelle sur la grille,
 * avec une taille déterminée par la valeur de `box`.
 *
 * @param {CanvasRenderingContext2D} ctx - Le contexte de rendu 2D du canvas utilisé pour dessiner.
 * @param {Array<{x: number, y: number}>} snake - Un tableau représentant le serpent, où chaque élément est un segment avec des coordonnées `x` et `y`.
 * @param {number} box - La taille d'une case de la grille en pixels, utilisée pour déterminer la taille de chaque segment du serpent.
 */
function drawSnake(ctx, snake, box) {

  snake.forEach((segment, index) => {
    if (index === 0)
      ctx.fillStyle = snakeHeadColor; // tête
    else
      ctx.fillStyle = snakeBodyColor; // corps

    ctx.fillRect(segment.x, segment.y, box, box);
  });
}

export { initSnake, moveSnake, drawSnake }; 