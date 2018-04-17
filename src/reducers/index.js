import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import { LOGOUT_SUCCSESS } from "../constants";

import commonReducer from "./common";
import navReducer from "./navigation";
import loginReducer from "../container/Login/reducer";
import signupReducer from "../container/SignUp/reducer";
import saveUserInfoReducer from "../container/Home/reducer";
import registerReducer from "../container/RegisterContainer/reducer";
import countingReducer from "../navigator/reducer";

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
  common: commonReducer,
  nav: navReducer,
  auth: loginReducer,
  signup: signupReducer,
  userInfo: saveUserInfoReducer,
  registerInfo: registerReducer,
  counting: countingReducer
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
