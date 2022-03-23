import { LOGIN_ACTION } from "../types/types";

const initialState = {
  userData: {},
};

const LoginReducer = (state = initialState, action) => {
  console.log(state, "aaaaaaaaaaa");
  switch (action.type) {
    case LOGIN_ACTION:
      return { ...state, userData: action };
    default:
      return state;
  }
};

export { LoginReducer };
