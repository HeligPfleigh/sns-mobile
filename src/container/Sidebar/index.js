import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, Image, StyleSheet } from "react-native";
import { Container, List, ListItem, Content } from "native-base";

import OtherIcon from "react-native-vector-icons/Entypo";
import { logOut } from "./actions";
import { fakeBanner } from "../../constants";
import { fakeAvatar } from "../../constants";

const styles = StyleSheet.create({
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50
  }
});

const routes = [
  {
    route: "Home",
    caption: "Home",
    drawerIcon: <OtherIcon name="home" size={20} color="lightgrey" />
  },
  {
    route: "BlankScreen",
    caption: "Dòng thời gian",
    drawerIcon: <OtherIcon name="home" size={20} color="lightgrey" />
  },
  {
    route: "BlankScreen",
    caption: "Chung cư của tôi",
    drawerIcon: <OtherIcon name="shopping-bag" size={20} color="lightgrey" />
  },
  {
    route: "BlankScreen",
    caption: "Shop",
    drawerIcon: <OtherIcon name="dribbble" size={20} color="lightgrey" />
  },
  {
    route: "ChangePasswordScreen",
    caption: "Đổi mật khẩu",
    drawerIcon: <OtherIcon name="key" size={20} color="lightgrey" />
  },
  {
    route: "ProfileScreen",
    caption: "Tài khoản",
    drawerIcon: <OtherIcon name="check" size={20} color="lightgrey" />
  },
  {
    route: "Logout",
    caption: "Đăng xuất",
    drawerIcon: <OtherIcon name="login" size={20} color="lightgrey" />
  }
];

@connect(
  ({ userInfo }) => ({
    fullName: userInfo.fullName,
    id: userInfo._id,
    avatarUri: userInfo && userInfo.profile && userInfo.profile.picture,
    banner: userInfo && userInfo.profile && userInfo.profile.banner
  }),
  dispatch => ({
    logOut: navigation => dispatch(logOut(navigation))
  })
)
export default class SidebarContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation, fullName, avatarUri, banner } = this.props;
    return (
      <Container>
        <Image source={{ uri: banner || fakeBanner }} style={{ height: 200, width: "100%" }} />
        <View style={{ flexDirection: "row", marginLeft: 20, marginTop: -40, height: 100 }}>
          <Image source={{ uri: avatarUri || fakeAvatar }} style={styles.avatar} />
          <Text style={{ fontSize: 20, backgroundColor: "transparent", marginTop: 50, marginLeft: 10 }}>
            {fullName || "Full Name"}
          </Text>
        </View>
        <Content>
          {/* <View style={{ paddingLeft: 15 }}>
            <Text style={{ paddingTop: 70, fontSize: 35, color: "#A53865" }}> SNS </Text>
            <Text style={{ color: "#A53865" }}> Mạng xã hội chung cư </Text>
          </View> */}
          <List
            // style={{ marginTop: 20 }}
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  onPress={() => {
                    navigation.navigate("DrawerClose");
                    data.route === "Logout" ? this.props.logOut(navigation) : navigation.navigate(data.route);
                    data.route === "ProfileScreen"
                      ? this.props.navigation.navigate("FriendProfileScreen", { id: this.props.id })
                      : navigation.navigate(data.route);
                  }}
                >
                  {data.drawerIcon}
                  <View style={{ flex: 1 }}>
                    <Text style={{ marginLeft: 20 }}>{data.caption}</Text>
                  </View>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
