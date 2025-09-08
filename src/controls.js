/**
 * ETML
 * Auteur initial : Grégory Charmier
 * Date initiale : 29.08.2024
 *
 * Modified by : Christopher Ristic, 01.09.2025   // facultatif, si modifications majeures (> 80% du code)
 *
 * @module  controls.js
 * @author  Grégory Charmier
 * Description : Bibliothèque pour gérer les contrôles du jeu Snake.
 */

import { Direction, ArrowKey } from "./constantes";

/**
 * Gère le changement de direction du serpent en fonction de l'entrée de l'utilisateur.
 *
 * Cette fonction est appelée chaque fois qu'une touche directionnelle est pressée.
 * Elle vérifie que la nouvelle direction n'est pas opposée à la direction actuelle
 * (pour éviter que le serpent se retourne sur lui-même) et retourne la nouvelle direction
 * si elle est valide.
 *
 * @param {KeyboardEvent} keyboardEvent - L'événement clavier qui contient les informations sur la touche pressée.
 * @param {string} currentDirection - La direction actuelle du serpent (peut être "UP", "DOWN", "LEFT", ou "RIGHT").
 * @returns {string} - La nouvelle direction du serpent après traitement, ou la direction actuelle si le changement n'est pas valide.
 */

function handleDirectionChange(keyboardEvent, currentDirection) {
  const key = keyboardEvent.key;

  switch (key) {
    case ArrowKey.UP:

      if (currentDirection !== Direction.DOWN)
        return Direction.UP;

      break;

    case ArrowKey.DOWN:

      if (currentDirection !== Direction.UP)
        return Direction.DOWN;

      break;

    case ArrowKey.LEFT:

      if (currentDirection !== Direction.RIGHT)
        return Direction.LEFT;

      break;

    case ArrowKey.RIGHT:

      if (currentDirection !== Direction.LEFT)
        return Direction.RIGHT;

      break;

    default:
      return currentDirection;
  }  
  return currentDirection;
}

export { handleDirectionChange };