import React, { Component } from "react";

import { Text, Button, Left, Body, ListItem, Thumbnail } from "native-base";
import { graphql, compose } from "react-apollo";
import { gql } from "apollo-boost";
import { FlatList, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from "react-native";

import ME_QUERY from "../../../graphql/queries/me";

class DataSuggest extends Component {
  accept(id) {
    this.props
      .addfriend({
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
      return <ActivityIndicator size="small" color="black" />;
    }

    if (this.props.data.error) {
      return <Text>An unexpected error occurred</Text>;
    }

    return (
      <FlatList
        keyExtractor={index => index._id}
        data={this.props.data.me.friendSuggestions}
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
                    {item.item.building.name}{" "}
                  </Text>
                </Body>
              </Left>

              <Button info style={{ marginLeft: 10, marginTop: 30 }} onPress={this.accept.bind(this, item.item._id)}>
                <Text> Kết bạn </Text>
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

const AddFriend = gql`
  mutation sendFriendRequest($_id: String!) {
    sendFriendRequest(_id: $_id) {
      username
    }
  }
`;

const DataSuggestWithData = compose(graphql(ME_QUERY), graphql(AddFriend, { name: "addfriend" }))(DataSuggest);

export default DataSuggestWithData;
