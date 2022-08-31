import { LOGIN_ACTION } from "../types/types";

const loginAction = (payload) => {
  return {
    type: LOGIN_ACTION,
    payload,
  };
};

export { loginAction };
