import { combineReducers } from "@reduxjs/toolkit";
import boardReducer from './boardReducers';
import menuOptionsReducer from "./menuOptionsReducer";
import scoreBoardReducer from "./scoreBoardReducer";
import turnReducer from "./turnReducer";
const rootReducer = combineReducers({
  menuOptions: menuOptionsReducer,
  scores: scoreBoardReducer,
  turn: turnReducer,
  board:boardReducer
});

export default rootReducer;
