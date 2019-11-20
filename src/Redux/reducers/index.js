import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import MenuReducer from "./MenuReducer";
import taskReducer from "./taskReducer";
import qualifyReducer from "./qualifyReducer";

export default combineReducers({
  Login: loginReducer,
  Menu: MenuReducer,
  Task: taskReducer,
  Qualify: qualifyReducer
});
