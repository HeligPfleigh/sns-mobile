import React from "react";
import { Icon } from "native-base";
import { StackNavigator, DrawerNavigator, SwitchNavigator, TabNavigator } from "react-navigation";

// common components
import icons from "./icons";
import { TabBar } from "../components/TabNavigator";

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
import NewFeedScreen from "../container/NewFeedScreen";
import Sidebar from "../container/Sidebar";
import FriendBox from "../container/FriendsBox";

// Screens from drawer menu
import ProfileScreen from "../container/ProfileScreen";

/************* START CONFIG APP ROUTES *******************/
/*********** Tabs Batch Screens *********************/
const feedStackNav = StackNavigator(
  {
    ListFeeds: { screen: Home },
    NewFeed: { screen: NewFeedScreen }
  },
  {
    headerMode: "none"
  }
);

const TabsRouteConfig = {
  Home: { screen: feedStackNav },
  FriendBox: { screen: FriendBox },
  BlankScreen: { screen: BlankScreen },
};

const AppRouteConfig = TabNavigator(TabsRouteConfig, {
  initialRouteName: "Home",
  tabBarComponent: TabBar,
  tabBarPosition: "bottom",
  swipeEnabled: true,
  animationEnabled: true,
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: () => {
      const { routeName } = navigation.state;

      return <Icon name={icons[routeName] || "home"} style={{ fontSize: 29 }} />;
    }
  })
});

const MenuRouteConfig = {
  ...TabsRouteConfig,
  ProfileScreen: { screen: ProfileScreen }
};

const MenuWithTabRouteConfig = TabNavigator(MenuRouteConfig, {
  initialRouteName: "ProfileScreen",
  tabBarComponent: TabBar,
  tabBarPosition: "bottom",
  swipeEnabled: false,
  animationEnabled: true,
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: () => {
      const { routeName } = navigation.state;

      return <Icon name={icons[routeName] || "home"} style={{ fontSize: 29 }} />;
    }
  })
});

/*********** Drawer Batch Screens ****************************/
const AppRouters = DrawerNavigator(
  {
    Main: AppRouteConfig
    // Menu: MenuRouteConfig
  },
  {
    initialRouteName: "Main",
    contentComponent: props => <Sidebar {...props} />,
    drawerPosition: "right"
  }
);

/*********** Authentication Batch Screens *******************/
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

/************** Expose all scren (routes) *******************/
export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthRouters,
    App: AppRouters,
    Menu: MenuWithTabRouteConfig
  },
  {
    initialRouteName: "AuthLoading"
  }
);
