import { AsyncStorage } from "react-native";
import isEmpty from "lodash/isEmpty";
import { ACCESS_TOKEN } from "../constants";

// function use check user logged
export const isAuthenticate = () =>
  AsyncStorage.getItem(ACCESS_TOKEN)
    .then(val => isEmpty(val))
    .catch(e => false);

// Define function utils
