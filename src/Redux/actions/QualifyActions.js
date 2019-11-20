import { QUALIFY } from "./types";
import axios from "axios";
import { Endpoint } from "./Constants";
//import base64url from "base64url";
//import moment from 'moment';

export const QualifyAction = iduser => dispatch => {
  let sendtoken = localStorage.getItem("ptk");
  const LOGIN_ENDPOINT = `${Endpoint}/auth/getusersinfo`;
  return axios
    .post(
      LOGIN_ENDPOINT,
      {
        userIdList: [iduser]
      },
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
        type: QUALIFY,
        payload: res
      });
      if (res.status === 200) {
        return 1;
      } else {
        return 0;
      }
    });
};
