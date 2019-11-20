import { LOGOUT } from "./types";
import axios from "axios";
import { Endpoint } from "./Constants";

export const LogoutAction = () => dispatch => {
  const LOGIN_ENDPOINT = `${Endpoint}/auth/logout`;
  let token = localStorage.getItem("ptk");
  localStorage.removeItem("ptk");
  localStorage.removeItem("prtk");
  dispatch({
    type: LOGOUT,
    token: ""
  });
  axios.post(
    LOGIN_ENDPOINT,
    {},
    {
      validateStatus: false,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
