import Orientation from "react-native-orientation";
import { AppState } from "react-native";

import { NET_STATE_CHANGE, APP_STATE_CHANGE, ORIENTATION_MODE_CHANGE, SPINNER_CHANGE } from "../constants";

const initializeState = {
  isNetConnect: false,
  appState: AppState.currentState,
  isShowSpinner: false,
  orientation: Orientation.getInitialOrientation()
};

const commonReducer = (state = initializeState, action) => {
  switch (action.type) {
    case NET_STATE_CHANGE:
      return {
        ...state,
        isNetConnect: action.payload
      };
    case APP_STATE_CHANGE:
      return {
        ...state,
        appState: action.payload
      };
    case ORIENTATION_MODE_CHANGE:
      return {
        ...state,
        orientation: action.payload
      };
    case SPINNER_CHANGE:
      return {
        ...state,
        isShowSpinner: action.payload
      };
    default:
      return state;
  }
};

export const orientationDidChange = orientation => ({ type: ORIENTATION_MODE_CHANGE, payload: orientation });
export const netInfoConnectivityDidChange = isNetConnect => ({ type: NET_STATE_CHANGE, payload: isNetConnect });

export default commonReducer;
