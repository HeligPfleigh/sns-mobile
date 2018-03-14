import { LOGIN_SUCCESS, LOGIN_FAILED, LOGIN_CLEAR_STATUS } from "./actions";

const initialState = {
  token: "",
  user: {},
  isLogin: false,
  status: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload
      };

    case LOGIN_FAILED:
      return {
        ...state,
        status: false
      };

    case LOGIN_CLEAR_STATUS:
      return {
        ...state,
        status: true
      };

    default:
      return state;
  }
}
