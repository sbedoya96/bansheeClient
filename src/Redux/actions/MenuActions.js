import { MENU } from "./types";
import axios from "axios";
import { Endpoint } from "./Constants";

export const MenuAction = () => dispatch => {
  let sendtoken = localStorage.getItem("ptk");
  const LOGIN_ENDPOINT = `${Endpoint}/auth/getmenu`;
  return axios
    .post(
      LOGIN_ENDPOINT,
      {},
      {
        validateStatus: false,
        headers: {
          Authorization: `Bearer ${sendtoken}`
        }
      }
    )
    .then(res => {
      console.log(res);
      dispatch({
        type: MENU,
        payload: res
      });
      if (res.status === 200) {
        return 1;
      } else {
        return 0;
      }
    });
};
