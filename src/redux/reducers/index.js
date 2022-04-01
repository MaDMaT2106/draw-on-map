import { combineReducers } from "redux";
import textReducer from "./textReducer";
import getFigures from "./reducer";

export default combineReducers({
  textReducer,
  getFigures,
});
