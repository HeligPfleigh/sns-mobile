import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import distanceInWordToNow from "date-fns/distance_in_words_to_now";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import HeaderAvatar from "../HeaderAvatar";
import { colors } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  avatarContainer: {
    flex: 0.15,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 5,
  },
  leftContainer: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    margin: 5,
    borderRadius: 25,
    backgroundColor: "#e4e4e4",
  },
  contentContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  metaContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 20,
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    alignSelf: "stretch",
    backgroundColor: colors.WHITE,
  },
  nameText: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.SECONDARY,
  },
  commentText: {
    color: colors.SECONDARY,
  },
  repButton: {
    flex: 1,
    flexDirection: "row",
    marginRight: 30,
  },
  repButtonText: {
    fontSize: 12,
    marginHorizontal: 3,
    color: colors.LIGHT_GRAY,
  }
});

@connect(
  null,
  dispatch => ({ dispatch })
)
class FeedComments extends Component{
  state = {
    displayReplyButton: false,
  }

  _displayReplyButton = () => this.setState({ displayReplyButton: !this.state.displayReplyButton})

  _handlePressReply = () => {
    const { postID, commentInfo } = this.props;
    this.props.dispatch(NavigationActions.navigate({
      routeName: "CommentReplyScreen",
      params: {
        postID: postID,
        commentID: commentInfo._id,
      }
    }));
  }

  render(){
    const { commentInfo } = this.props;
    const avatar = commentInfo.user.profile.picture;
    const name = commentInfo.user.username;
    const comment = commentInfo.messagePlainText;
    const { createdAt } = commentInfo;

    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <HeaderAvatar avatar={avatar}/>
        </View>
        <View style={styles.leftContainer}>
          <TouchableOpacity style={styles.infoContainer} onPress={this._displayReplyButton}>
            <View style={styles.metaContainer}>
              <Text style={styles.nameText}>{name}</Text>
              <Text style={styles.timeText}>{ distanceInWordToNow(createdAt) }</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.commentText}>{comment}</Text>
            </View>
          </TouchableOpacity>
          {this.state.displayReplyButton ? <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.repButton} onPress={this._handlePressReply}>
              <MaterialCommunityIcons name="message-reply-text" size={20} color={colors.LIGHT_GRAY}/>
              <Text style={styles.repButtonText}>Reply</Text>
            </TouchableOpacity>
          </View> : null}
        </View>
      </View>
    );
  }
}

export default FeedComments;
