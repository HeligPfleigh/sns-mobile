import { COUNTING } from "./action";
import { COUNTINGDOWN } from "./action";


const initialState = {};

export default function(state = initialState, action) {

  switch (action.type) {
    case COUNTING:
      return {
        ...state,
        ...action.payload
      };
    case COUNTINGDOWN:

      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}


