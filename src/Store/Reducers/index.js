import menuOptionsReducer from "./menuOptionsReducer";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  menuOptions: menuOptionsReducer,
});

export default rootReducer;
