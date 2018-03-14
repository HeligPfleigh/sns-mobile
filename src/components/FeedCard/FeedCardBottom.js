import React from "react";
import { CardItem, Left, Body, Right, Text, Button, Icon } from "native-base";

const favoriteCount = 3;

const FeedCardBottom = () => (
  <CardItem>
    <Left>
      <Button transparent>
        <Icon active name="thumbs-up" />
        <Text>{favoriteCount}</Text>
      </Button>
    </Left>
    <Body>
      <Button transparent>
        <Icon active name="chatbubbles" />
        <Text>{favoriteCount}</Text>
      </Button>
    </Body>
    <Right>
      <Button transparent>
        <Icon active name="chatbubbles" />
        <Text>{favoriteCount}</Text>
      </Button>
    </Right>
  </CardItem>
);

export default FeedCardBottom;
