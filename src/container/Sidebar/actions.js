import { NavigationActions } from "react-navigation";
import { AsyncStorage } from "react-native";
import * as utils from "../../utils/common";
import { ACCESS_TOKEN, USER_ID, CREATE_TIME, TTL } from "../../constants";

import { LOGOUT_SUCCSESS } from "../../constants";

export const logOut = navigation => {
  return dispatch => {
    // remove local storage
    AsyncStorage.multiRemove([ACCESS_TOKEN, USER_ID, CREATE_TIME, TTL]);
    // clear redux store
    dispatch(utils.createAction(LOGOUT_SUCCSESS));

    // redirect to login screen
    navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Login" })]
      })
    );
  };
};
