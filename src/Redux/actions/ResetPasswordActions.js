import { RESET_PASS, MIDDLE } from "./types";
import axios from "axios";
import { Endpoint } from "./Constants";

export const ResetPassAction = (Pass, newPass) => dispatch => {
  let token = localStorage.getItem("ptk");
  let refreshToken = localStorage.getItem("prtk");
  const REFRESH_ENDPOINT = `${Endpoint}/auth/refresh`;
  const RESET_PASS = `${Endpoint}/auth/changepassword`;

  if (token) {
    return axios
      .post(
        RESET_PASS,
        { password: Pass, newpassword: newPass },
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
          return 200;
        } else if (res.status === 400) {
          return 400;
        }
        dispatch({
          type: RESET_PASS,
          payload: res
        });
      })
      .then(res => {
        if (res === 200) {
          return axios
            .post(
              REFRESH_ENDPOINT,
              { refresh: refreshToken },
              {
                validateStatus: false,
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            )
            .then(res => {
              console.log("respuesta despues de actualizar token (abajo)");
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
        } else {
          return 400400;
        }
      });
  } else {
    return new Promise(function(resolve) {
      resolve(0);
    });
  }
};
