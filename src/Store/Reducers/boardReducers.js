export default function boardReducer(
  board = {
    tiles: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    winner: "",
    winningTiles: [],
  },
  action
) {
  switch (action.type) {
    default:
      return board;
  }
}
