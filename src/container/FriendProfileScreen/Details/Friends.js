import React, { Component } from "react";
import { Text, Body, Card, CardItem, Icon } from "native-base";
import { View } from "react-native";

class Friends extends Component {
  render() {
    return (
      <Card>
        <CardItem>
          <Body>
          <View style={{ margin: 20 }}>
          <Text > <Icon name="ios-card" style={{ fontSize: 13, lineHeight: 35  }} /> Bạn bè: {this.props.info.totalFriends} người </Text>

      </View>
      </Body>
      </CardItem>
      </Card>
    );
  }
}

export default Friends;
