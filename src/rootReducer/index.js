import { combineReducers } from "redux";
import { LoginReducer } from "../redux/reducer/loginReducer";

export const RootReducer = combineReducers({ Login: LoginReducer });
