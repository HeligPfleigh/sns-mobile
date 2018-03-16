import React, { Component } from "react"

import {
  Container,
  Header,
  Title,
  View,
  Content,
  Text,
  Button,
  FooterTab,
  Left,
  Right,
  Body,
  Item,
  List,
  ListItem,
  Tab,
  Tabs,
  TabHeading,
  Thumbnail,
  Input
} from "native-base"

import Icon from "react-native-vector-icons/FontAwesome"

export default class Tab3 extends Component {
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
    )
  }
}
