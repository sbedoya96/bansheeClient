import { QUALIFY, ANSWER, CHEF, TOPIC } from "../actions/types";

export const initialState = {
  user: [],
  chef: [],
  topic: [],
  answer: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case QUALIFY:
      return {
        ...state,
        user: action.payload.data.data || []
      };
    case CHEF:
      return {
        ...state,
        chef: action.payload.data.data || []
      };
    case TOPIC:
      return {
        ...state,
        topic: action.payload.data.data || []
      };
    case ANSWER:
      return {
        ...state,
        answer: action.payload.data.data || []
      };
    default:
      return state;
  }
};
