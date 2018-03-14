import { Alert } from "react-native";

// default redux action convention
export const createAction = (type, payload) => {
  return { type, payload };
};

// alert notify when device not has internet connection
export const noInternetAccess = () => {
  setTimeout(() => {
    Alert.alert(
      "Network error",
      "No internet access, please check setting network.",
      [{ text: "OK", onPress: () => {} }],
      {
        cancelable: false
      }
    );
  }, 200);
};
