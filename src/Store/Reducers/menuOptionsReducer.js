export default function menuOptionsReducer(
  menu = { playerOneMark: "x", playerAgainst: "player" },
  action
) {

  switch (action.type) {

    case "UPDATE_MARK":
      return { playerOneMark: action.mark, playerAgainst: menu.playerAgainst };
      
    case "UPDATE_PLAYER":
      return {
        playerOneMark: menu.playerOneMark,
        playerAgainst: action.against,
      };

    default:
      return menu;
  }
}
