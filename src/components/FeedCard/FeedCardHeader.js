import React, { Component } from "react";
import { CardItem, Body, Left, Text, Right } from "native-base";
import { StyleSheet } from "react-native";
import distanceInWordToNow from "date-fns/distance_in_words_to_now";
import { connect } from "react-redux";

import HeaderAvatar from "../HeaderAvatar";
import FeedCardEditMenu from "./FeedCardEditMenu";

const styles = StyleSheet.create({
  container: {
    height: 50,
  },
});

@connect(
  ({userInfo}) => ({
    userInfo: userInfo,
  }),
)
class FeedCardHeader extends Component {
  render(){
    const { username, createdAt, profile, userInfo, postId } = this.props;
    return (
      <CardItem style={styles.container}>
        <Left>
          <HeaderAvatar avatar={profile.picture} />
          <Body>
            <Text>{ username }</Text>
            <Text note>{ distanceInWordToNow(createdAt) } ago</Text>
          </Body>
        </Left>
        <Right>
          { userInfo.username === username ? <FeedCardEditMenu postId={postId}/> : null }
        </Right>
      </CardItem>
    );
  }
}

export default FeedCardHeader;
