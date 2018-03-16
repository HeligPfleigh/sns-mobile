import { StackNavigator, DrawerNavigator, SwitchNavigator } from "react-navigation";
import React from "react";

// Welcome screen
import Welcome from "../container/Welcome";

// Auth screen
import BlankScreen from "../container/BlankScreen";
import SignUp from "../container/SignUp";
import Login from "../container/Login";
import ForgotPassword from "../container/ForgotPassword";
import AuthLoadingScreen from "../container/AuthLoadingScreen";

// Main app screen
import Home from "../container/Home";
import Sidebar from "../container/Sidebar";
import FriendBox from "../container/FriendsBox";

const AppRouteConfig = {
  Home: { screen: Home },
  FriendBox: { screen: FriendBox },
  BlankScreen: { screen: BlankScreen }
};

const AppRouters = DrawerNavigator(AppRouteConfig, {
  initialRouteName: "Home",
  contentComponent: props => <Sidebar {...props} />,
  drawerPosition: "right"
});

const AuthRouteConfig = {
  // Welcome screen
  Welcome: { screen: Welcome },

  // SignUp Screen
  SignUp: { screen: SignUp },

  // Login Screen
  Login: { screen: Login },
  ForgotPassword: { screen: ForgotPassword }
};

const AuthRouters = StackNavigator(AuthRouteConfig, {
  headerMode: "none",
  initialRouteName: "Welcome"
});

export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthRouters,
    App: AppRouters
  },
  {
    initialRouteName: "AuthLoading"
  }
);
