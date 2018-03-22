import React, { Component } from "react";
import { Text, Button, Left, Body, ListItem, Thumbnail } from "native-base";
import { graphql, compose } from "react-apollo";
import { gql } from "apollo-boost";
import { FlatList, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from "react-native";

class FriendRequest extends Component {
  accept(id) {
    this.props
      .acceptfriend({
        variables: { _id: id }
      })
      .then(({ data }) => {
        this.props.data.refetch();
      })
      .catch(error => {
        throw error;
      });
  }

  deny(id) {
    this.props
      .rejectfriend({
        variables: { _id: id }
      })
      .then(({ data }) => {
        this.props.data.refetch();
      })
      .catch(error => {
        throw error;
      });
  }

  render() {
    if (this.props.data.loading) {
      return <ActivityIndicator size="small" color="#00ff00" />;
    }

    if (this.props.data.error) {
      return <Text>An unexpected error occurred</Text>;
    }

    if (this.props.data.me.friendRequests.length === 0) {
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
                  <Thumbnail large source={{ uri: item.item.profile.picture }} />
                </TouchableOpacity>

                <Body>
                  <Text style={styles.text}> {item.item.username} </Text>
                  <Text style={styles.textSmall} note>
                    {" "}
                  </Text>
                </Body>
              </Left>

              <Body style={{ flexDirection: "column" }}>
                <Button
                  small
                  info
                  style={{ marginLeft: 20, marginTop: 10, width: Dimensions.get("window").width / 3.5 }}
                  onPress={this.accept.bind(this, item.item._id)}
                >
                  <Text style={{ textAlign: "center" }}> Chấp nhận </Text>
                </Button>
                <Button
                  small
                  danger
                  style={{ marginLeft: 20, marginTop: 10, width: Dimensions.get("window").width / 3.5 }}
                  onPress={this.deny.bind(this, item.item._id)}
                >
                  <Text style={{ textAlign: "center" }}> Từ chối </Text>
                </Button>
              </Body>
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
        _id
        profile {
          picture
        }
        building {
          name
        }
      }
    }
  }
`;

const Accept = gql`
  mutation acceptFriend($_id: String!) {
    acceptFriend(_id: $_id) {
      username
      _id
    }
  }
`;

const Deny = gql`
  mutation rejectFriend($_id: String!) {
    rejectFriend(_id: $_id) {
      username
      _id
    }
  }
`;

const FriendRequestWithData = compose(
  graphql(FriendQuery),
  graphql(Deny, { name: "rejectfriend" }),
  graphql(Accept, { name: "acceptfriend" })
)(FriendRequest);

export default FriendRequestWithData;
