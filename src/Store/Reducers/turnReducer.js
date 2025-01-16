export default function turnReducer(turn = "x", action) {
  switch (action.type) {
    case "CHANGE_TURN":
      return turn === "x" ? "o" : "x";

    case "NEW_GAME":
    case "RESTART":
      return "x";
    default:
      return turn;
  }
}

/**
 * In My turnReducer function, the NEW_GAME case is included in the switch statement, but you haven't provided any specific logic for it beyond what is already defined in the RESTART case. This means that when the action type is NEW_GAME, the reducer will execute the same logic as for the RESTART case, which is to reset the turn to 'x'
 */
