import { MIDDLE, INFO } from "./types";
import axios from "axios";
import base64url from "base64url";
import moment from "moment";
import { Endpoint } from "./Constants";

export const MiddleAction = () => dispatch => {
  let token = localStorage.getItem("ptk");
  let refreshToken = localStorage.getItem("prtk");
  let payload = JSON.parse(base64url.decode(token.split(".")[1]));

  //let sendtoken;
  if (moment().diff(moment(Number(payload.exp) * 1000)) < 0) {
    //codigo si no ha expirado el token
    dispatch({
      type: INFO,
      infoTk: payload
    });
    return new Promise(function(resolve) {
      resolve(0);
    });
  } else {
    const LOGIN_ENDPOINT = `${Endpoint}/auth/refresh`;
    return axios
      .post(
        LOGIN_ENDPOINT,
        { refresh: refreshToken },
        {
          validateStatus: false,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("ptk", res.data.data.token);
          localStorage.setItem("prtk", res.data.data.refresh);
        } else if (res.status === 400) {
          return 400;
        }
        dispatch({
          type: MIDDLE,
          payload: res
        });
        return 200;
      });
    //codigo si ya expiró el token
  }
};
