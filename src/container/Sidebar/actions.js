import { NavigationActions } from "react-navigation";
import { AsyncStorage } from "react-native";

import * as utils from "../../utils/common";
import { client } from "../../store";
import { LOGOUT_SUCCSESS } from "../../constants";

export const logOut = navigation => {
  return async dispatch => {
    // remove local storage
    await AsyncStorage.clear();
    // clear redux store
    dispatch(utils.createAction(LOGOUT_SUCCSESS));

    // reset apollo store to make sure user is really logout
    client.resetStore();

    // redirect to login screen
    navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Login" })]
      })
    );
  };
};
