import * as utils from "../utils/common";
export const COUNTING = "COUNTING";


export const counting = params => dispatch => {
  return dispatch(utils.createAction(COUNTING,params));
};



// // double arrows here = function counting(params){
//   return function(dispatch){
//     return dispat...
//   }
// } -> voodoo redux stuff
