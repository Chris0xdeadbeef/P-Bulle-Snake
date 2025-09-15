/**
 * ETML
 * Auteur initial : Grégory Charmier
 * Date initiale : 29.08.2024
 *
 * Modified by : Christopher Ristic, 01.09.2025   // facultatif, si modifications majeures (> 80% du code)
 *
 * @module  collision.js
 * @author  Grégory Charmier
 * Description : Bibliothèque pour gérer les collisions dans le jeu Snake.
 */
import { LAYERS } from "./constantes.js";

/**
 * Vérifie si la tête du serpent entre en collision avec son propre corps.
 *
 * Cette fonction détermine si la tête du serpent occupe la même position que
 * n'importe quel autre segment de son corps. Si la tête du serpent se trouve
 * aux mêmes coordonnées `x` et `y` qu'un autre segment, la fonction retourne `true`,
 * indiquant une collision avec le corps du serpent (c'est-à-dire que le serpent se mord la queue).
 *
 * @param {{x: number, y: number}} head - Un objet représentant les coordonnées `x` et `y` de la tête du serpent.
 * @param {Array<{x: number, y: number}>} snakeArray - Un tableau d'objets représentant les segments du serpent, où chaque objet contient des coordonnées `x` et `y`.
 * @returns {boolean} - Retourne `true` si la tête du serpent entre en collision avec un segment de son corps, sinon `false`.
 */
function checkCollision(head, snakeArray) {
  const noHeadOrBody = !head || !Array.isArray(snakeArray);

  if (noHeadOrBody)
    return false;

  // On ignore la tête (index 0)
  return snakeArray.slice(1).some(segment => {
    const isSnakeSegment = (segment.layer & LAYERS.SNAKE) !== 0;
    const isSamePosition = segment.x === head.x && segment.y === head.y;

    return isSnakeSegment && isSamePosition;
  });
}

/**
 * Vérifie si la tête du serpent entre en collision avec les murs du canvas.
 *
 * Cette fonction détermine si la tête du serpent a dépassé les limites du canvas,
 * ce qui signifierait une collision avec un mur. Si la tête du serpent sort du canvas
 * (c'est-à-dire si ses coordonnées `x` ou `y` sont en dehors des limites définies par
 * la largeur et la hauteur du canvas), la fonction retourne `true`, indiquant une collision.
 *
 * @param {{x: number, y: number}} head - Un objet représentant les coordonnées `x` et `y` de la tête du serpent.
 * @param {HTMLCanvasElement} canvas - L'élément canvas représentant la surface de jeu.
 * @param {number} box - La taille d'une case de la grille en pixels, utilisée pour déterminer les limites du déplacement du serpent.
 * @param {Array<{x:number, y:number, layer:number}>} [entities=[]] - Tableau des entités du jeu pouvant être des murs internes ou obstacles. 
 *        Chaque entité peut avoir un `layer` ; la fonction vérifie si la tête du serpent touche un segment avec `layer = WALL`.
 * @returns {boolean} - Retourne `true` si la tête du serpent entre en collision avec un mur, sinon `false`.
 */
function checkWallCollision(head, canvas, box, entities = []) {
  if (!head || !canvas || typeof box !== "number") return false;

  // Collision avec les bords du canvas (en tenant compte de la taille du segment)
  const hitLeft = head.x < 0;
  const hitTop = head.y < 0;
  const hitRight = head.x + box > canvas.width;
  const hitBottom = head.y + box > canvas.height;

  // Collision avec murs internes via layer
  const hitWall = entities.some(segment =>
    (segment.layer & LAYERS.WALL) !== 0 &&
    segment.x === head.x &&
    segment.y === head.y
  );

  return hitLeft || hitTop || hitRight || hitBottom || hitWall;
}

export { checkCollision, checkWallCollision };
