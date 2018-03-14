import React from "react";
import { CardItem, Body, Left, Thumbnail, Text } from "native-base";

const lastName = "Le Duc";
const firstName = "Linh";
const createdAt = "1 day ago";
const avatar = "https://randomuser.me/api/portraits/women/25.jpg";

const FeedCardHeader = () => (
  <CardItem>
    <Left>
      <Thumbnail source={{ uri: avatar }} />
      <Body>
        <Text>{`${firstName} ${lastName}`}</Text>
        <Text note>{createdAt}</Text>
      </Body>
    </Left>
  </CardItem>
);

export default FeedCardHeader;
