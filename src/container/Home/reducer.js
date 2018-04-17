import { SAVE_USER_INFO } from "./index";
const initialState = {};

export default function(state = initialState, action) {

  switch (action.type) {

    case SAVE_USER_INFO:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
