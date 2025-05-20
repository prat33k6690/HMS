import { combineReducers } from "redux";
import layoutReducer from "../reducers/layout";

const reducers = combineReducers({
  layout: layoutReducer,
});

const rootReducer = reducers;

export default rootReducer;
