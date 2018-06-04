import React, { Component } from "react";
import { Text, Card, CardItem, Icon } from "native-base";

class Friends extends Component {
  render() {
    return (
      <Card>
        <CardItem>
          <Icon name="ios-card" />
          <Text> Bạn bè: {this.props.info.totalFriends} người </Text>
        </CardItem>
      </Card>
    );
  }
}

export default Friends;
