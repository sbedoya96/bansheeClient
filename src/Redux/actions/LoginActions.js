import { LOGIN } from "./types";
import axios from "axios";
import { Endpoint } from "./Constants";

export const LoginAction = dataReq => dispatch => {
  const LOGIN_ENDPOINT = `${Endpoint}account/login`;
  return axios
    .post(
      LOGIN_ENDPOINT,
      {
        username: dataReq.user,
        password: dataReq.pass
      },
      {
        validateStatus: false,

        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }
    )
    .then(res => {
      console.log(res);
      dispatch({
        type: LOGIN,
        payload: res,
        user: dataReq.user,
        pass: dataReq.pass
      });
      if (res.status === 200) {
        return 1;
      } else {
        return 0;
      }
    });
};
