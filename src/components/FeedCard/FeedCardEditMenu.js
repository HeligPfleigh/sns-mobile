import React, { Component } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Icon } from "native-base";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { compose, graphql } from "react-apollo";

import { colors } from "../../constants";
import DELETE_POST from "../../graphql/mutations/deletePost";
const ICON_SIZE = 20;

@compose(connect(null, dispatch => ({ dispatch })), graphql(DELETE_POST, { name: "deletePost" }))
class FeedCardEditMenu extends Component {
  _handleDeletePost = () => {
    Alert.alert(
      "Bài viết sẽ bị xoá",
      "bạn chắc chán ?",
      [
        {
          text: "Xoá",
          onPress: async () => {
            const { postId } = this.props;
            await this.props.deletePost({
              variables: {
                _id: postId
              }
            });
            if (this.props.stuff.stuff.stuff.data) {
              await this.props.stuff.stuff.stuff.data.refetch();
            } else {
              await this.props.stuff.stuff.stuff.getFeeds.refetch();
            }
          }
        },
        { text: "Huỷ" }
      ],
      { cancelable: false }
    );
  }

  _handleEditPost = () => {
    const { message, postId } = this.props;
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "EditPostScreen",
        params: {
          postId,
          message
        }
      })
    );
  }

  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={this._handleEditPost} style={{alignSelf:"center",backgroundColor:"transparent",paddingLeft:15, paddingRight: 5}}>
          <Icon
            type="MaterialIcons"
            name="edit"
            style={{ fontSize: ICON_SIZE, color: colors.PRIMARY }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this._handleDeletePost} style={{alignSelf:"center",backgroundColor:"transparent",paddingRight:15}}>
          <Icon
            type="MaterialIcons"
            name="delete"
            style={{ fontSize: ICON_SIZE, color: "#ff6666" }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default FeedCardEditMenu;
