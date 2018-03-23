import React, { Component } from "react";
import {  ActivityIndicator, TouchableOpacity, FlatList, View, Dimensions } from "react-native";
import { graphql, compose } from "react-apollo";
import { gql } from "apollo-boost";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Thumbnail
} from "native-base";
import styles from "./styles";
import Layout from "../../components/Layout";

class Notification extends Component {
  press(id) {
    this.props
      .updateseen({
        variables: { _id: id }
      })
      .then(({ data }) => {
        this.props.data.refetch();
      })
      .catch(error => {
        throw (error);
      });
  }

  render() {
    if (this.props.data.loading) {
      return <ActivityIndicator size="small" color="#00ff00" />;
    }

    if (this.props.data.error) {
      return <Text>An unexpected error occurred</Text>;
    }

    let text;

    return (
      <Layout navigation={this.props.navigation}>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="ios-arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title> Thông báo </Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="md-settings" />
              </Button>
            </Right>
          </Header>
          <Content style={styles.container}>
            <FlatList
              keyExtractor={index => index._id}
              data={this.props.data.notifications.edges}
              renderItem={(item, index) => {
                return (
                  <TouchableOpacity
                    onPress={this.press.bind(this, item.item._id)}
                    style={
                      item.item.isRead === false
                        ? { backgroundColor: "#e7e7e7e3", margin: 5, flexDirection: "row" }
                        : { backgroundColor: "white", margin: 5, flexDirection: "row" }
                    }
                  >
                    <Thumbnail
                      style={{ height: Dimensions.get("window").height / 12,marginLeft: 10 }}
                      square
                      source={{ uri: item.item.actors[0].profile.picture }}
                    />
                    <View
                      style={{
                        height: Dimensions.get("window").height / 12,
                        width: Dimensions.get("window").width / 0.8
                      }}
                    >
                      <Text style={{ padding: 3 }}>
                        {" "}
                        {item.item.actors.map((data, index) => {
                          return <Text key={index}> {data.username} </Text>;
                        })}{" "}
                        {item.item.type === "ACCEPTED_FRIEND"
                          ? "chấp nhận kết bạn"
                          : (text =
                              item.item.type === "LIKES"
                                ? "thích bài viết"
                                : (text =
                                    item.item.type === "NEW_POST"
                                      ? "vừa đăng bài viết"
                                      : (text =
                                          item.item.type === "EVENT_INVITE"
                                            ? "mời bạn tham dự một sự kiện"
                                            : (text =
                                                item.item.type === "JOIN_EVENT"
                                                  ? "sẽ tham sự một sự kiện"
                                                  : (text =
                                                      item.item.type === "CAN_JOIN_EVENT"
                                                        ? "có thể tham dự một sự kiện"
                                                        : (text =
                                                            item.item.type === "CANT_JOIN_EVENT"
                                                              ? "không thể tham dự một sự kiện"
                                                              : (text =
                                                                  item.item.type === "EVENT_DELETED"
                                                                    ? "cho biết huỷ sự kiện"
                                                                    : (text =
                                                                        item.item.type === "EVENT_CANCELLED"
                                                                          ? "cho biết bỏ qua sự kiện"
                                                                          : (text =
                                                                              item.item.type === "ACCEPTED_JOIN_BUILDING"
                                                                                ? "chấp nhận tham gia toà nhà"
                                                                                : (text =
                                                                                    item.item.type ===
                                                                                    "REJECTED_JOIN_BUILDING"
                                                                                      ? "từ chối tham gia toà nhà"
                                                                                      : (text =
                                                                                          item.item.type ===
                                                                                          "SHARING_POST"
                                                                                            ? "chia sẻ bài viết"
                                                                                            : (text =
                                                                                                item.item.type ===
                                                                                                "INTEREST_EVENT"
                                                                                                  ? "quan tâm đến sự kiện"
                                                                                                  : (text =
                                                                                                      item.item.type ===
                                                                                                      "DISINTEREST_EVENT"
                                                                                                        ? "không quan tâm đến một sự kiện"
                                                                                                        : (text =
                                                                                                            item.item
                                                                                                              .type ===
                                                                                                            "NEW_FEE_APARTMENT"
                                                                                                              ? "thông báo khoản phí toà nhà mới"
                                                                                                              : (text =
                                                                                                                  item
                                                                                                                    .item
                                                                                                                    .type ===
                                                                                                                  "NEW_ANNOUNCEMENT"
                                                                                                                    ? "thông báo một thông tin"
                                                                                                                    : (text =
                                                                                                                        item
                                                                                                                          .item
                                                                                                                          .type ===
                                                                                                                        "REMIND_FEE"
                                                                                                                          ? "thông báo về nhắc nhở khoản phí"
                                                                                                                          : (text =
                                                                                                                              item
                                                                                                                                .item
                                                                                                                                .type ===
                                                                                                                              "COMMENTS"
                                                                                                                                ? "bình luận bài viết"
                                                                                                                                : "gửi lời mời kết bạn")))))))))))))))))}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </Content>
        </Container>
      </Layout>
    );
  }
}

const NotificationQuery = gql`
  query {
    notifications {
      edges {
        _id
        isRead
        createdAt
        updatedAt
        type
        subject {
          messagePlainText
          totalLikes
        }
        actors {
          username
          createdAt
          updatedAt
          profile {
            picture
          }
        }
      }
    }
  }
`;

const UpdateReadPost = gql`
  mutation updateRead($_id: String!) {
    updateRead(_id: $_id) {
      _id
    }
  }
`;

const NotificationWithData = compose(graphql(NotificationQuery), graphql(UpdateReadPost, { name: "updateseen" }))(
  Notification
);

export default NotificationWithData;
