import React from "react";
import { Icon } from "native-base";
import { StackNavigator, DrawerNavigator, SwitchNavigator, TabNavigator } from "react-navigation";
import IconBadge from "react-native-icon-badge";
import NotificationNumber from "./badges";
import FriendProfileScreen from "../container/FriendProfileScreen";
// common components
import icons from "./icons";
import { TabBar } from "../components/TabNavigator";


// Welcome screen
import Welcome from "../container/Welcome";
// Auth screen
import SignUp from "../container/SignUp";
import Login from "../container/Login";
import ForgotPassword from "../container/ForgotPassword";
import AuthLoadingScreen from "../container/AuthLoadingScreen";

import BasicInfoScreen from "../container/RegisterContainer/BasicInfoScreen";
import BuildingInfoScreen from "../container/RegisterContainer/BuildingInfoScreen";
import RegisterProfileInfo from "../container/RegisterContainer/ProfileInfoScreen";
import RegisterVerification from "../container/RegisterContainer/VerificationScreen";

// Main app screen
import Home from "../container/Home";
import NewFeedScreen from "../container/NewFeedScreen";
import PostDetail from "../container/PostDetailScreen";
import EditPostScreen from "../container/EditPostScreen";
import CommentReplyScreen from "../container/CommentReplyScreen";
import Sidebar from "../container/Sidebar";
import FriendBox from "../container/FriendsBox";
import Notification from "../container/Notification";
import SearchBox from "../container/SearchBox";
// Screens from drawer menu
import ProfileScreen from "../container/ProfileScreen";
import ChangePasswordScreen from "../container/ChangePasswordScreen";

/************* START CONFIG APP ROUTES *******************/
/*********** Tabs Batch Screens *********************/

const TabsRouteConfig = {
  Home: { screen: Home },
  FriendBox: { screen: FriendBox },
  SearchBox: { screen: SearchBox },
  Notification: { screen: Notification }
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
      var  number;

      if (icons[routeName] === "notifications") {
        return (
          <IconBadge
            MainElement={<Icon name={icons[routeName] || "home"} style={{ fontSize: 29 }} />}
            BadgeElement={<NotificationNumber number={number}/>}
          />
        );
      }
      return <Icon name={icons[routeName]} style={{ fontSize: 29 }} />;
    }
  })
});


const MenuRouteConfig = {
  ...TabsRouteConfig,
  ProfileScreen: { screen: ProfileScreen },
  ChangePasswordScreen: { screen: ChangePasswordScreen }
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
      if (icons[routeName] === "notifications") {
        return (
          <IconBadge
            MainElement={<Icon name={icons[routeName] || "home"} style={{ fontSize: 29 }} />}
            BadgeElement={<NotificationNumber />}
          />
        );
      }
      return <Icon name={icons[routeName]} style={{ fontSize: 29 }} />;
    }
  })
});

const StackAppRouteConfig = StackNavigator(
  {
    TabScreen: { screen: AppRouteConfig },
    PostDetail: { screen: PostDetail },
    NewFeed: { screen: NewFeedScreen },
    EditPostScreen: { screen: EditPostScreen },
    CommentReplyScreen: { screen: CommentReplyScreen },
    FriendProfileScreen: { screen: FriendProfileScreen }
  },
  {
    headerMode: "none"
  }
);

/*********** Drawer Batch Screens ****************************/
const AppRouters = DrawerNavigator(
  {
    Main: StackAppRouteConfig
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

  // Register Screen
  RegisterBasicInfo: { screen: BasicInfoScreen },
  RegisterBuildingInfo: { screen: BuildingInfoScreen },
  RegisterProfileInfo: { screen: RegisterProfileInfo },
  RegisterVerification: { screen: RegisterVerification },

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
