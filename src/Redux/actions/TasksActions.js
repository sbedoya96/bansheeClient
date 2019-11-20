import { TASK } from "./types";
import axios from "axios";
import { Endpoint } from "./Constants";

export const TasksAction = () => dispatch => {
  let sendtoken = localStorage.getItem("ptk");
  const LOGIN_ENDPOINT = `${Endpoint}/challenge/getuserchallenges`;
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
        type: TASK,
        payload: res
      });
      if (res.status === 200) {
        return 1;
      } else {
        return 0;
      }
    });
};
