import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { compose, graphql } from "react-apollo";

import { colors } from "../../constants";
import DELETE_POST from "../../graphql/mutations/deletePost";
const ICON_SIZE = 20;

@compose(
  connect(
    null,
    dispatch => ({ dispatch })
  ),
  graphql(DELETE_POST, { name: "deletePost" })
)
class FeedCardEditMenu extends Component {
  _handleDeletePost = async () => {
    const { postId } = this.props;
    await this.props.deletePost({
      variables: {
        _id: postId,
      },
      refetch: ["feeds"]
    });
    this.props.dispatch(NavigationActions.navigate({
      routeName: "Home",
    }));
  }

  _handleEditPost = () => {
    const { message } = this.props;
    this.props.dispatch(NavigationActions.navigate({
      routeName: "EditPostScreen",
      params: {
        message: message
      }
    }));
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
