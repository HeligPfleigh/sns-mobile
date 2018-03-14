import { SIGNUP_STATUS } from "./actions";

const initialState = {
  status: null,
  signUpSuccess: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_STATUS:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}
