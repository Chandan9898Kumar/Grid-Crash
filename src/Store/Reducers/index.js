import { combineReducers } from "@reduxjs/toolkit";
import menuOptionsReducer from "./menuOptionsReducer";
import scoreBoardReducer from "./scoreBoardReducer";
import turnReducer from "./turnReducer";
const rootReducer = combineReducers({
  menuOptions: menuOptionsReducer,
  scores: scoreBoardReducer,
  turn: turnReducer,
});

export default rootReducer;
