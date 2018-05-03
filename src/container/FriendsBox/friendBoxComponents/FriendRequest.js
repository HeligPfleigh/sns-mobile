import React, { Component } from "react";
import { Text, Button, Left, Body, ListItem, Thumbnail } from "native-base";
import { graphql, compose } from "react-apollo";
import { FlatList, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import ME_QUERY from "../../../graphql/queries/me";
import Accept from "../../../graphql/mutations/acceptFriend";
import Deny from "../../../graphql/mutations/rejectFriend";

class FriendRequest extends Component {
  _handlePressAvatar = id => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "FriendProfileScreen",
        params: { id: id }
      })
    );
  }

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
                <TouchableOpacity style={styles.button} onPress={this._handlePressAvatar.bind(this, item.item._id)}>
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

const FriendRequestWithData = compose(
  graphql(ME_QUERY),
  graphql(Deny, { name: "rejectfriend" }),
  graphql(Accept, { name: "acceptfriend" }),
  connect(null, dispatch => ({
    dispatch
  }))
)(FriendRequest);

export default FriendRequestWithData;
