import { LOGIN_ACTION } from "../types/types";

const loginAction = (payload) => {
  console.log(payload, "payload");
  return {
    type: LOGIN_ACTION,
    action: payload,
  };
};

export { loginAction };
