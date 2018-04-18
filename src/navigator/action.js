import * as utils from "../utils/common";
export const COUNTING = "COUNTING";
export const COUNTINGDOWN = "COUNTINGDOWN";

export const counting = params => dispatch => {
  return dispatch(utils.createAction(COUNTING,params));
};

export const countingDown = params => dispatch => {
  return dispatch(utils.createAction(COUNTINGDOWN,params));
};
