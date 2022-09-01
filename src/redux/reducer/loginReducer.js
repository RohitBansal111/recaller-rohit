import { LOGIN_ACTION } from "../types/types";

const initialState = {
  userData: "",
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export { LoginReducer };
