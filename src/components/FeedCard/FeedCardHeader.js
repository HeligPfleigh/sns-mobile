import React from "react";
import { CardItem, Body, Left, Thumbnail, Text } from "native-base";
import { StyleSheet } from "react-native";
import distanceInWordToNow from "date-fns/distance_in_words_to_now";

import { fakeAvatar } from "../../constants";

const styles = StyleSheet.create({
  container: {
    height: 50,
  },
});

const FeedCardHeader = ({ username, createdAt, profile }) => (
  <CardItem style={styles.container}>
    <Left>
      <Thumbnail small source={{ uri: profile.picture || fakeAvatar }} />
      <Body>
        <Text>{ username }</Text>
        <Text note>about { distanceInWordToNow(createdAt) } ago</Text>
      </Body>
    </Left>
  </CardItem>
);

export default FeedCardHeader;
