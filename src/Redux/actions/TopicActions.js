import { TOPIC } from "./types";
import axios from "axios";
import { Endpoint } from "./Constants";

export const TopicAction = iduser => dispatch => {
  let sendtoken = localStorage.getItem("ptk");
  const LOGIN_ENDPOINT = `${Endpoint}/rating/getmeasures`;
  return axios
    .post(
      LOGIN_ENDPOINT,
      {
        meritId: iduser
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
        type: TOPIC,
        payload: res
      });
      if (res.status === 200) {
        return 1;
      } else {
        return 0;
      }
    });
};
