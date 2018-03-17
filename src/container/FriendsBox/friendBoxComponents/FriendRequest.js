import React, { Component } from "react";
import { View, Text, Body, List, ListItem, Thumbnail } from "native-base";

class FriendRequest extends Component {
  render() {
    return (
      <View>
        <List>
          <ListItem>
            <Thumbnail square size={80} source={{ uri: "http://salad5f6.github.io/Gmail/vu.jpg" }} />
            <Body>
              <Text>Duongvu</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Thumbnail square size={80} source={{ uri: "http://salad5f6.github.io/Gmail/vu.jpg" }} />
            <Body>
              <Text>DUongvu</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Thumbnail square size={80} source={{ uri: "http://salad5f6.github.io/Gmail/vu.jpg" }} />
            <Body>
              <Text>Duongvu</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Thumbnail square size={80} source={{ uri: "http://salad5f6.github.io/Gmail/vu.jpg" }} />
            <Body>
              <Text>Duongvu</Text>
            </Body>
          </ListItem>
        </List>
      </View>
    );
  }
}

export default FriendRequest;
