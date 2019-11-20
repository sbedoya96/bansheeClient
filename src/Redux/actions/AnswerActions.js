import { ANSWER } from "./types";
import axios from "axios";
import store from "../store";
import { Endpoint } from "./Constants";

export const AnswerAction = quest => dispatch => {
  let sendtoken = localStorage.getItem("ptk");
  const LOGIN_ENDPOINT = `${Endpoint}/rating/saverating`;
  return axios
    .post(
      LOGIN_ENDPOINT,
      {
        answers: quest,
        rating: store
          .getState()
          .Task.tasks.find(x => x.id == localStorage.getItem("rtse"))
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
        type: ANSWER,
        payload: res
      });
      if (res.status === 200) {
        return 1;
      } else {
        return 0;
      }
    });
};
