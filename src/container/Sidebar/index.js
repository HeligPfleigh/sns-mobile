import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, Image, StyleSheet } from "react-native";
import { Container, List, ListItem, Content, Header } from "native-base";
import { graphql, compose, withApollo } from "react-apollo";
import ME_QUERY from "../../graphql/queries/me";

import OtherIcon from "react-native-vector-icons/Entypo";
import Images from "../../assets/images";
import { logOut } from "./actions";
import { fakeAvatar } from "../../constants";

const styles = StyleSheet.create({
  avatar:{
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop:-50,
    marginLeft:20
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
@compose(
  connect(null, dispatch => ({
    logOut: navigation => dispatch(logOut(navigation))
  })),
  withApollo,
  graphql(ME_QUERY, { name: "getMe" })
)
export default class SidebarContainer extends Component {
  render() {
    const { navigation, getMe } = this.props;
    const avatarUri = getMe && getMe.me && getMe.me.profile && getMe.me.profile.picture;
    return (
      <Container>
        <Image source={Images.backgroundHeader} style={{ height: 200, width: "100%"}} />
        <Image
          source={{uri:avatarUri || fakeAvatar}}
          style={styles.avatar}
        />
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
