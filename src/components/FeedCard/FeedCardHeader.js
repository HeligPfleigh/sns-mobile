import React from "react";
import { CardItem, Body, Left, Thumbnail, Text } from "native-base";
import { StyleSheet } from "react-native";

import { fakeAvatar } from "../../constants";
const styles = StyleSheet.create({
  container: {
    height: 50,
  },
});

const lastName = "Le Duc";
const firstName = "Linh";
const createdAt = "1 day ago";

const FeedCardHeader = () => (
  <CardItem style={styles.container}>
    <Left>
      <Thumbnail small source={{ uri: fakeAvatar }} />
      <Body>
        <Text>{firstName} {lastName}</Text>
        <Text note>{createdAt}</Text>
      </Body>
    </Left>
  </CardItem>
);

export default FeedCardHeader;
