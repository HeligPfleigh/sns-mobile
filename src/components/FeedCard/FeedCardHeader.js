import React from "react";
import { CardItem, Body, Left, Text } from "native-base";
import { StyleSheet } from "react-native";
import distanceInWordToNow from "date-fns/distance_in_words_to_now";

import HeaderAvatar from "../HeaderAvatar";

const styles = StyleSheet.create({
  container: {
    height: 50,
  },
});

const FeedCardHeader = ({ username, createdAt, profile }) => (
  <CardItem style={styles.container}>
    <Left>
      <HeaderAvatar avatar={profile.picture} />
      <Body>
        <Text>{ username }</Text>
        <Text note>about { distanceInWordToNow(createdAt) } ago</Text>
      </Body>
    </Left>
  </CardItem>
);

export default FeedCardHeader;
