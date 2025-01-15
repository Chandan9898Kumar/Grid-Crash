import { combineReducers } from "@reduxjs/toolkit";
import menuOptionsReducer from "./menuOptionsReducer";
import scoreBoardReducer from "./scoreBoardReducer";

const rootReducer = combineReducers({
  menuOptions: menuOptionsReducer,
  scores: scoreBoardReducer,
});

export default rootReducer;
