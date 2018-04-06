import React, { Component } from "react";
import { StyleSheet, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

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
  _handlePressAvatar = () => {
    const {id} = this.props;
    this.props.dispatch(
        NavigationActions.navigate({
          routeName: "FriendProfileScreen",
          params: { id : id}
        }
      )
    );
  }

  render(){
    const { avatar } = this.props;

    if (!avatar) {
      return (
        <ActivityIndicator size="small"/>
      );
    }


    return (

      <TouchableOpacity onPress={this._handlePressAvatar}>
        <Image style={styles.avatar} source={{ uri: avatar || fakeAvatar }}/>
      </TouchableOpacity>
    );
  }
}




export default connect(null, dispatch => ({
  dispatch
}))(HeaderAvatar);
