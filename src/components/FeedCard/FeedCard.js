import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Card, CardItem } from "native-base";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
const deviceWidth = Dimensions.get("window").width;


import { colors } from "../../constants";
import FeedCardHeader from "./FeedCardHeader";
import FeedCardBottom from "./FeedCardBottom";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    minHeight: 300,
    width: deviceWidth - 20,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "flex-start",
    width: "100%",
  },
  touchableContent: {
    flex: 1,
    alignSelf: "stretch",
  },
  textContent: {
    fontSize: 14,
    textAlign: "left",
    fontWeight: "500",
    color: colors.SECONDARY,
  }
});

@connect(
  ({ common, nav }) => ({
    nav: nav,
    orientation: common.orientation
  }),
  dispatch => ({ dispatch })
)
class FeedCard extends Component {
  _handlePressContent = () => {
    const { _id, totalComments } = this.props;
    this.props.dispatch(NavigationActions.navigate({
      routeName: "PostDetail",
      params: {
        postID: _id,
        limit: totalComments,
      }
    }));
  }

  render(){
    const { _id, messagePlainText, author, isLiked, totalComments, totalLikes, createdAt, user, building } = this.props;

    const displayText = messagePlainText.length > 300 ? `${messagePlainText.substring(0,300)}...` : messagePlainText;

    return (
      <Card style={styles.container}>
        <FeedCardHeader
          {...author}
          createdAt={createdAt}
          postId={_id}
          friendShared={user}
          buildingShared={building} />
        <CardItem cardBody style={styles.contentContainer}>
          <TouchableOpacity style={styles.touchableContent} onPress={this._handlePressContent}>
            <Text style={styles.textContent}>
              {displayText}
            </Text>
          </TouchableOpacity>
        </CardItem>
        <FeedCardBottom postID={_id} isLiked={isLiked} totalComments={totalComments} totalLikes={totalLikes}/>
      </Card>
    );
  }
}

export default FeedCard;
