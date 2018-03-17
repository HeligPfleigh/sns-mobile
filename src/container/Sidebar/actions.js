import { NavigationActions } from "react-navigation";
import { AsyncStorage } from "react-native";
import * as utils from "../../utils/common";

import { LOGOUT_SUCCSESS } from "../../constants";

export const logOut = navigation => {
  return async dispatch => {
    // remove local storage
    await AsyncStorage.clear();
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
