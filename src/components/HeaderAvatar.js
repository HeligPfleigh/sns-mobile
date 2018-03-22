import React, { Component } from "react";
import { StyleSheet, Image, ActivityIndicator, TouchableOpacity } from "react-native";

import { fakeAvatar } from "../constants";

const AVATAR_SIZE = 30;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const styles = StyleSheet.create({
  avatar:{
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    borderRadius: AVATAR_RADIUS,
  },
});

class HeaderAvatar extends Component {
  render(){
    const { avatar } = this.props;
    if (!avatar) {
      return (
        <ActivityIndicator size="small"/>
      );
    }

    return (
      <TouchableOpacity>
        <Image style={styles.avatar} source={{ uri: avatar || fakeAvatar }}/>
      </TouchableOpacity>
    );
  }
}

export default HeaderAvatar;
