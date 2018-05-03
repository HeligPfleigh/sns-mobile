import React, { Component } from "react";
import { Text, Button, Left, Body, ListItem, Thumbnail } from "native-base";
import { graphql, compose } from "react-apollo";
import { FlatList, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import AddFriendNew from "../../../graphql/mutations/sendFriendRequest";
import ME_QUERY from "../../../graphql/queries/me";
import fakeAvatar from "../../../constants";

class DataSuggest extends Component {
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
                <TouchableOpacity style={styles.button} onPress={this._handlePressAvatar.bind(this, item.item._id)}>
                  <Thumbnail large source={{ uri: item.item.profile.picture || fakeAvatar }} />
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

const DataSuggestWithData = compose(
  graphql(ME_QUERY),
  graphql(AddFriendNew, { name: "addfriend" }),
  connect(null, dispatch => ({
    dispatch
  }))
)(DataSuggest);

export default DataSuggestWithData;
