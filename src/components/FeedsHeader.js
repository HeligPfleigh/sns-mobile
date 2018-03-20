import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Card } from "native-base";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationActions } from "react-navigation";

import { colors, fakeAvatar } from "../constants";

const AVATAR_SIZE = 30;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
    minHeight: 50,
    width: "100%",
  },
  avatarContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    paddingLeft: 15,
  },
  avatar:{
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    borderRadius: AVATAR_RADIUS,
  },
  textContainer: {
    flex: 4,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.LIGHT_GRAY,
  },
  cameraContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
});

@connect(
  ({ common, nav }) => ({
    nav: nav,
    orientation: common.orientation
  }),
  dispatch => ({ dispatch })
)
class FeedsHeader extends Component{
  _handlePressNewFeed = () => {
    const { info } = this.props;
    this.props.dispatch(NavigationActions.navigate({
      routeName: "NewFeed",
      params: {
        user: info,
      }
    }));
  }

  render(){
    const { info } = this.props;
    const avatar = info.profile.picture;
    const text = `What's new with you, ${info.username}? `;
    return (
      <Card style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{ uri: avatar || fakeAvatar }}/>
        </View>
        <TouchableOpacity style={styles.textContainer} onPress={this._handlePressNewFeed}>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
        <View style={styles.cameraContainer}>
          <MaterialCommunityIcons name="pencil" size={20} color={colors.LIGHT_GRAY} />
        </View>
      </Card>
    );
  }
}

export default FeedsHeader;
