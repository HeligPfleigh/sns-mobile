import { StackNavigator, DrawerNavigator } from "react-navigation";
import React from "react";

// First screen
import BlankScreen from "../container/BlankScreen";
import SignUp from "../container/SignUp";
import Login from "../container/Login";
import ForgotPassword from "../container/ForgotPassword";

// Main app screen
import Home from "../container/Home";
import Sidebar from "../container/Sidebar";

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home }
  },
  {
    initialRouteName: "Home",
    contentComponent: props => <Sidebar {...props} />
  }
);

const routeConfig = {
  BlankScreen: { screen: BlankScreen },

  // SignUp Screen
  SignUp: { screen: SignUp },

  // Login Screen
  Login: { screen: Login },
  ForgotPassword: { screen: ForgotPassword },

  // Dashboard Screen
  Drawer: { screen: Drawer }
};

export const AppNavigator = StackNavigator(routeConfig, {
  initialRouteName: "Drawer",
  headerMode: "none"
});
