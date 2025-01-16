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
  const allTiles = board.tiles;

  switch (action.type) {

    
    case "UPDATE_BOARD":
      const rowToUpdate = action.row;
      const columnToUpdate = action.column;
      const turn = action.turn;
      const newTiles = allTiles.map((row, rowIndex) => {
        if (rowIndex === rowToUpdate) {
          return row.map((tile, columnIndex) => {
            if (columnIndex === columnToUpdate) {
              return turn === "x" ? "x" : "o";
            }
            return tile;
          });
        }
        return row;
      });
      return {
        tiles: newTiles,
        winner: board.winner,
        winningTiles: board.winningTiles,
      };

    case "SET_DRAW":
      return { tiles: board.tiles, winner: "draw", winningTiles: [] };

    case "NEW_GAME":
    case "RESTART":
      return {
        tiles: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        winner: "",
        winningTiles: [],
      };
    default:
      return board;
  }
}
