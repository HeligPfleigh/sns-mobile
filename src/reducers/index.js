import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import { LOGOUT_SUCCSESS } from "../constants";

import commonReducer from "./common";
import loginReducer from "../container/Login/reducer";
import signupReducer from "../container/SignUp/reducer";
import { createNavReducer } from "../utils/navigator";

const appReducer = combineReducers({
  form: formReducer.plugin({
    signUp: (state, action) => {
      switch (action.type) {
        case "AUTH_LOGIN_FAIL":
          return {
            ...state,
            values: {
              ...state.values
              // password: undefined,
              // tempPassword: undefined
            },
            registeredFields: {
              ...state.registeredFields
              // password: undefined,
              // tempPassword: undefined
            },
            syncErrors: {
              ...state.syncErrors,
              ...action.payload
            }
          };
        default:
          return state;
      }
    }
  }),
  ...createNavReducer(),
  auth: loginReducer,
  common: commonReducer,
  signup: signupReducer
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  switch (action.type) {
    case LOGOUT_SUCCSESS:
      return initialState;
  }

  return appReducer(state, action);
};

export default rootReducer;
