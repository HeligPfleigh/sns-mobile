import { StackNavigator, DrawerNavigator } from "react-navigation";
import React from "react";

// Welcome screen
import Welcome from "../container/Welcome";

// First screen
import BlankScreen from "../container/BlankScreen";
import SignUp from "../container/SignUp";
import Login from "../container/Login";
import ForgotPassword from "../container/ForgotPassword";
import FriendBox from "../container/FriendsBox";
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

  // Welcome screen
  Welcome: { screen: Welcome },

  // SignUp Screen
  SignUp: { screen: SignUp },

  // Login Screen
  Login: { screen: Login },
  ForgotPassword: { screen: ForgotPassword },

  // Dashboard Screen
  Drawer: { screen: Drawer },
  FriendBox: { screen: FriendBox }
  
};

export const AppNavigator = StackNavigator(routeConfig, {
  initialRouteName: "Welcome",
  headerMode: "none"
});
