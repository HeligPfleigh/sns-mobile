import * as utils from "../../utils/common";

export const CHANGE_REGISTER_NAME = "CHANGE_REGISTER_NAME";
export const CHANGE_REGISTER_BUILDING = "CHANGE_REGISTER_BUILDING";
export const CHANGE_REGISTER_PROFILE = "CHANGE_REGISTER_PROFILE";

export const changeRegisterName = params => dispatch => {
  return dispatch(utils.createAction(CHANGE_REGISTER_NAME, params));
};

export const changeRegisterBuilding = params => dispatch => {
  return dispatch(utils.createAction(CHANGE_REGISTER_BUILDING, params));
};

export const changeRegisterProfile = params => dispatch => {
  return dispatch(utils.createAction(CHANGE_REGISTER_PROFILE, params));
};
