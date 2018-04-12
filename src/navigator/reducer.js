import { COUNTING } from "./action";


const initialState = {};
export default function (state  , action) {
  switch (action.type) {
    case COUNTING:
      return {
        ...state
      };

    default:
      return state;
  }
}


