import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { colors } from "../../constants";
const ICON_SIZE = 20;

class FeedCardEditMenu extends Component {
  _handleDeletePost = () => {

  }

  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={this._handleEditPost} style={{alignSelf:"center",backgroundColor:"transparent",paddingLeft:15, paddingRight: 5}}>
          <MaterialIcons
            name="edit"
            size={ICON_SIZE}
            color={colors.PRIMARY}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this._handleDeletePost} style={{alignSelf:"center",backgroundColor:"transparent",paddingRight:15}}>
          <MaterialIcons
            name="delete"
            size={ICON_SIZE}
            color="#ff6666"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default FeedCardEditMenu;
