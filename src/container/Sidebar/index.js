import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { Container, List, ListItem, Content } from "native-base";
import OtherIcon from "react-native-vector-icons/Entypo";

import { logOut } from "./actions";

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
    caption: "Sự kiện",
    drawerIcon: <OtherIcon name="direction" size={20} color="lightgrey" />
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
    route: "BlankScreen",
    caption: "Tài khoản",
    drawerIcon: <OtherIcon name="check" size={20} color="lightgrey" />
  },
  {
    route: "Logout",
    caption: "Đăng xuất",
    drawerIcon: <OtherIcon name="login" size={20} color="lightgrey" />
  }
];

@connect(null, dispatch => ({
  logOut: navigation => dispatch(logOut(navigation))
}))
export default class SidebarContainer extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Content>
          <View style={{ paddingLeft: 15 }}>
            <Text style={{ paddingTop: 70, fontSize: 35, color: "#A53865" }}> SNS </Text>
            <Text style={{ color: "#A53865" }}> Mạng xã hội chung cư </Text>
          </View>
          {/* <List
            style={{ marginTop: 40 }}
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  onPress={() => {
                    navigation.navigate("DrawerClose");
                    data.route === "Logout" ? this.props.logOut(navigation) : navigation.navigate(data.route);
                  }}
                >
                  {data.drawerIcon}
                  <View style={{ flex: 1 }}>
                    <Text style={{ marginLeft: 20 }}>{data.caption}</Text>
                  </View>
                </ListItem>
              );
            }}
          /> */}
        </Content>
      </Container>
    );
  }
}
