export default function scoreBoardReducer(
  scores = { x: 0, o: 0, ties: 0 },
  action
) {
  switch (action.type) {
    case "UPDATE_SCORE_X":
      return { x: scores.x + 1, o: scores.o, ties: scores.ties };
    case "UPDATE_SCORE_O":
      return { x: scores.x, o: scores.o + 1, ties: scores.ties };
    case "UPDATE_TIES":
      return { x: scores.x, o: scores.o, ties: scores.ties + 1 };
    case "RESTART":
      return { x: 0, o: 0, ties: 0 };
    default:
      return scores;
  }
}
