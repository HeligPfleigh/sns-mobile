import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Card, CardItem } from "native-base";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
const deviceWidth = Dimensions.get("window").width;

import { colors } from "../../constants";
import FeedCardHeader from "./FeedCardHeader";
import FeedCardBottom from "./FeedCardBottom";
import FeedCardPhotos from "../Photos/FeedCardPhotos";
import SharedPost from "../Post/SharedPost";
import { lineBreakCount } from "../../utils/common";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    minHeight: 300,
    width: deviceWidth - 20
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "flex-start",
    width: "100%"
  },
  touchableContent: {
    flex: 1,
    alignSelf: "stretch"
  },
  textContent: {
    fontSize: 14,
    textAlign: "left",
    fontWeight: "500",
    color: colors.SECONDARY
  }
});

const emptyFn = () => {};

@connect(
  ({ common, nav }) => ({
    nav: nav,
    orientation: common.orientation
  }),
  dispatch => ({ dispatch })
)
class FeedCard extends Component {
  static defaultProps = {
    onToggleSharingModal: emptyFn,
  }

  _handlePressContent = () => {
    const { _id, totalComments } = this.props;
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "PostDetail",
        params: {
          postID: _id,
          limit: totalComments
        }
      })
    );
  }

  render(){
    const { _id, messagePlainText, author, isLiked, totalComments,
      totalLikes, createdAt, user, building,
      photos, sharing, onToggleSharingModal } = this.props;

    let displayText = messagePlainText;
    // strim 80 first characters
    const shortenText = messagePlainText.length > 100 ? messagePlainText.substring(0, 100) : messagePlainText;
    displayText = shortenText;
    // get the first line of this sentences
    if (lineBreakCount(shortenText) > 1) {
      const firstLine = messagePlainText.split("\n")[0];
      displayText = `${firstLine}...`;
    }
    else {
      displayText = `${shortenText}...`;
    }

    return (
      <Card style={styles.container}>
        <FeedCardHeader
          {...author}
          createdAt={createdAt}
          postId={_id}
          message={messagePlainText} // for editting purpose
          friendShared={user}
          buildingShared={building} />
        <CardItem cardBody style={styles.contentContainer}>
          <TouchableOpacity style={styles.touchableContent} onPress={this._handlePressContent}>
            <Text style={styles.textContent}>{displayText}</Text>
            <FeedCardPhotos photos={photos} height={300}/>
            { sharing ? <SharedPost postID={sharing._id}/> : null }
          </TouchableOpacity>
        </CardItem>
        <FeedCardBottom
          postID={_id}
          isLiked={isLiked}
          totalComments={totalComments}
          totalLikes={totalLikes}
          onToggleSharingModal={onToggleSharingModal}
          handlePressComment={this._handlePressContent} />
      </Card>
    );
  }
}

export default FeedCard;
