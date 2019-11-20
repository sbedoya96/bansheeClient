import { CHEF } from "./types";
import axios from "axios";
import { Endpoint } from "./Constants";
//import base64url from "base64url";
//import moment from 'moment';

export const ChefAction = rating_type => dispatch => {
  let sendtoken = localStorage.getItem("ptk");
  const LOGIN_ENDPOINT = `${Endpoint}/rating/getmerits`;
  return axios
    .post(
      LOGIN_ENDPOINT,
      {
        typeId: rating_type
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
        type: CHEF,
        payload: res
      });
      if (res.status === 200) {
        return 1;
      } else {
        return 0;
      }
    });
};
