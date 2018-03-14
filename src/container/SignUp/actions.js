import * as utils from "../../utils/common";
export const SIGNUP_STATUS = "SIGNUP_STATUS";
export const AUTH_LOGIN_FAIL = "AUTH_LOGIN_FAIL";

export const userSignup = params => dispatch => {
  return setTimeout(() => {
    dispatch(utils.createAction(AUTH_LOGIN_FAIL));
  }, 5000);
};
