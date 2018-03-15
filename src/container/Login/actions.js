import * as utils from "../../utils/common";
import { SPINNER_CHANGE } from "../../constants";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_CLEAR_STATUS = "LOGIN_CLEAR_STATUS";

export const userLogin = params => dispatch => {
  return setTimeout(() => {
    dispatch(utils.createAction(SPINNER_CHANGE, false));
  }, 5000);
};
