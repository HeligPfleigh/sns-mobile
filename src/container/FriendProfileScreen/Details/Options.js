import React, { Component } from "react";
import { Text, View, Dimensions } from "react-native";
import { Button } from "native-base";
import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import SendFriendRequest from "../../../graphql/mutations/sendFriendRequest";
import SAVE_USER_INFO from "../../../graphql/queries/user";
import SearchQuery from "../../../graphql/queries/SearchQuery";
import ME_QUERY from "../../../graphql/queries/me";

class Options extends Component {
  addFriend(id) {
    this.props
      .sendRequest({
        variables: { _id: id },
        refetchQueries : [{
          query: SAVE_USER_INFO,
          variables : { _id : id }
        },
        {
          query: SearchQuery,
          variables : { keyword : "a" }
        },
        {
          query: ME_QUERY
        }
      ]
      })
      .then(res => {
        this.props.data.refetch();
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    const { info } = this.props;
    return (
      <View>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          {info.friendStatus === "FRIEND" ? (
            <Button
              disabled
              style={{
                width: Dimensions.get("window").width / 3.5,
                height: Dimensions.get("window").width / 10,
                margin: 5
              }}
            >
              <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}> Bạn bè </Text>
            </Button>
          ) : info.friendStatus === "STRANGER" ? (
            <Button
              info
              style={{
                width: Dimensions.get("window").width / 3.5,
                height: Dimensions.get("window").width / 10,
                margin: 5
              }}
              onPress={this.addFriend.bind(this, info._id)}
            >
              <Text style={{ color: "white", fontSize: 15, textAlign: "justify" }}> Kết bạn </Text>
            </Button>
          ) : (
            <Button
              disabled
              style={{
                width: Dimensions.get("window").width / 3.5,
                height: Dimensions.get("window").width / 10,
                margin: 5
              }}
            >
              <Text style={{ color: "white", fontSize: 15, textAlign: "justify" }}> Đã gửi yêu cầu </Text>
            </Button>
          )}

          <Button
            danger
            style={{
              width: Dimensions.get("window").width / 3.5,
              height: Dimensions.get("window").width / 10,
              margin: 5
            }}
          >
            <Text style={{ color: "white", fontSize: 15, textAlign: "justify" }}> Report </Text>
          </Button>
          <Button
            success
            style={{
              width: Dimensions.get("window").width / 3.5,
              height: Dimensions.get("window").width / 10,
              margin: 5
            }}
          >
            <Text style={{ color: "white", fontSize: 15, textAlign: "justify" }}> Nhắn tin </Text>
          </Button>
        </View>
      </View>
    );
  }
}
const OptionsWithData = compose(
  connect(
    ({ userInfo }) => ({ userInfo }),
    dispatch => ({
      dispatch
    })
  ),
  graphql(SendFriendRequest, { name: "sendRequest" })
)(Options);
export default OptionsWithData;
