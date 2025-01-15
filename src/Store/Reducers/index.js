import menuOptionsReducer from "./menuOptionsReducer";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  menuOPtions: menuOptionsReducer,
});

export default rootReducer;
