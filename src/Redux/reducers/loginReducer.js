import { LOGIN, LOGOUT, MIDDLE, INFO, RESET_PASS } from "../actions/types";

export const initialState = {
  user: "",
  pass: "",
  token: "",
  refresh: "",
  error: "",
  infoTk: {},
  resetPass: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload.data.data ? action.payload.data.data.token : "",
        refresh: action.payload.data.data
          ? action.payload.data.data.refresh
          : "",
        user: action.user,
        pass: action.pass,
        error: action.payload.data.data ? "" : action.payload.data.error.message
      };
    case LOGOUT:
      return {
        ...state,
        token: action.token
      };
    case MIDDLE:
      return {
        ...state,
        token: action.payload.data.token,
        refresh: action.payload.data.refresh
      };
    case INFO:
      return {
        ...state,
        infoTk: action.infoTk
      };
    case RESET_PASS:
      return {
        ...state,
        resetPass: action.payload.data.status
      };
    default:
      return state;
  }
};
