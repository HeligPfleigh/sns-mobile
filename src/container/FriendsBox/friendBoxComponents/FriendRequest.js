import React, { Component } from "react";
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
} from "native-base";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
import PropTypes from "prop-types";
import { FlatList, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

class FriendRequest extends Component {
  render() {
    if (this.props.data.loading) {
      return <ActivityIndicator size="small" color="#00ff00" />;
    }

    if (this.props.data.error) {
      console.log(this.props.data.error);
      return <Text>An unexpected error occurred</Text>;
    }

    console.log(this.props.data.me.friendRequests);

    if (this.props.data.me.friendRequests.length == 0) {
      return <Text style={{ paddingTop: 20, paddingBottom: 20, fontWeight: "bold" }}> Chưa có lời mời kết bạn </Text>;
    }

    return (
      <FlatList
        keyExtractor={index => index._id}
        data={this.props.data.me.friendRequests}
        renderItem={(item, index) => {
          return (
            <ListItem key={index}>
              <Left>
                <TouchableOpacity style={styles.button}>
                  <Thumbnail
                    square
                    source={{ uri: "http://salad5f6.github.io/Gmail/vu.jpg" }}
                    style={{ height: Dimensions.get("window").height / 7, width: Dimensions.get("window").width / 6 }}
                  />
                </TouchableOpacity>

                <Body>
                  <Text style={styles.text}> {item.item.username} </Text>
                  <Text style={styles.textSmall} note>
                    {" "}
                    {item.item.building.name}{" "}
                  </Text>
                </Body>
              </Left>

              <Button info style={{ marginLeft: 10, marginTop: 30 }}>
                <Text> Chấp nhận </Text>
              </Button>
              <Button info style={{ marginLeft: 10, marginTop: 30 }}>
                <Text> Từ chối </Text>
              </Button>
            </ListItem>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 5,
    width: Dimensions.get("window").width / 6,
    height: Dimensions.get("window").height / 7,
    flexDirection: "row"
  },
  text: {
    fontSize: 17,
    padding: 10
  },
  textSmall: {
    fontSize: 13,
    padding: 10
  }
});

const FriendQuery = gql`
  query {
    me {
      friendRequests {
        username
      }
    }
  }
`;
const FriendRequestWithData = graphql(FriendQuery)(FriendRequest);

export default FriendRequestWithData;
