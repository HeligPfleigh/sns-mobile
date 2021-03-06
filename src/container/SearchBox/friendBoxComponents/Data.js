import React, { Component } from "react";
import { Text, Button, Body, ListItem, Thumbnail } from "native-base";
import { graphql, compose, withApollo } from "react-apollo";
import propTypes from "prop-types";
import { FlatList, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, View } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import SearchQuery from "../../../graphql/queries/SearchQuery";
import AddFriendNew from "../../../graphql/mutations/sendFriendRequest";

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "..."
    };
  }

  accept(id) {
    this.props
      .addfriendnew({
        variables: { _id: id }
      })
      .then(data => {
        this.props.data.refetch();
      })
      .catch(error => {
        throw error;
      });
  }

  _handlePressAvatar = id => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "FriendProfileScreen",
        params: { id: id }
      })
    );
  }

  render() {
    const { data } = this.props;
    if (data.loading) {
      return <ActivityIndicator size="small" color="black" style={{ marginTop: 10 }} />;
    }

    if (data.error) {
      return <Text>An unexpected error occurred</Text>;
    }

    return (
      <FlatList
        keyExtractor={index => index._id}
        data={data.search}
        renderItem={(item, index) => {
          return (
            <ListItem key={index}>
              <TouchableOpacity style={styles.button} onPress={this._handlePressAvatar.bind(this, item.item._id)}>
                <Thumbnail large source={{ uri: item.item.profile.picture }} />
              </TouchableOpacity>

              <Body>
                <Text style={styles.text}> {item.item.username} </Text>
                <Text style={styles.textSmall} note>
                  {item.item.building.name}
                </Text>
              </Body>
              <View>
                {item.item.friendStatus === "FRIEND" ? (
                  <Button disabled style={{ marginLeft: 10, marginTop: 30, backgroundColor: "green" }}>
                    <Text> Đã kết bạn </Text>
                  </Button>
                ) : item.item.friendStatus === "STRANGER" ? (
                  <Button
                    info
                    style={{ marginLeft: 10, marginTop: 30 }}
                    onPress={this.accept.bind(this, item.item._id)}
                  >
                    <Text> Kết bạn </Text>
                  </Button>
                ) : (
                  <Button disabled style={{ marginLeft: 10, marginTop: 30 }}>
                    <Text> Đã gửi yêu cầu </Text>
                  </Button>
                )}
              </View>
            </ListItem>
          );
        }}
      />
    );
  }
}

Data.propTypes = {
  text: propTypes.string.isRequired
};

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

const DataWithData = compose(
  connect(null, dispatch => ({
    dispatch
  })),
  withApollo,
  graphql(AddFriendNew, {
    name: "addfriendnew"
  }),
  graphql(SearchQuery, {
    options(ownProps) {
      return {
        variables: {
          keyword: ownProps.text
        }
      };
    }
  })
)(Data);

export default DataWithData;
