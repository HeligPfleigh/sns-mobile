import React, { Component } from "react";
import { ActivityIndicator, TouchableOpacity, FlatList, View, Dimensions } from "react-native";
import { graphql, compose } from "react-apollo";
import { gql } from "apollo-boost";
import update from "immutability-helper";
import distanceInWordToNow from "date-fns/distance_in_words_to_now";
import { NavigationActions } from "react-navigation";
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Thumbnail } from "native-base";
import styles from "./styles";
import Layout from "../../components/Layout";
import { connect } from "react-redux";


const Cases = type => {
  var text = "";
  switch (type) {
    case "ACCEPTED_FRIEND":
      text = "chấp nhận kết bạn";
      break;

    case "LIKES":
      text = "thích bài viết";
      break;
    case "EVENT_INVITE":
      text = "mời bạn tham dự một sự kiện";
      break;
    case "JOIN_EVENT":
      text = "sẽ tham sự một sự kiện";
      break;

    case "CAN_JOIN_EVENT":
      text = "có thể tham dự một sự kiện";
      break;

    case "CANT_JOIN_EVENT":
      text = "không thể tham dự một sự kiện";
      break;

    case "EVENT_DELETED":
      text = "cho biết huỷ sự kiện";
      break;

    case "EVENT_CANCELLED":
      text = "cho biết bỏ qua sự kiện";
      break;

    case "ACCEPTED_JOIN_BUILDING":
      text = "chấp nhận tham gia toà nhà";
      break;

    case "REJECTED_JOIN_BUILDING":
      text = "từ chối tham gia toà nhà";
      break;

    case "SHARING_POST":
      text = "chia sẻ bài viết";
      break;

    case "INTEREST_EVENT":
      text = "quan tâm đến sự kiện";
      break;

    case "DISINTEREST_EVENT":
      text = "không quan tâm đến một sự kiện";
      break;

    case "NEW_FEE_APARTMENT":
      text = "thông báo khoản phí toà nhà mới";
      break;

    case "NEW_ANNOUNCEMENT":
      text = "thông báo một thông tin";
      break;

    case "REMIND_FEE":
      text = "thông báo về nhắc nhở khoản phí";
      break;

    case "COMMENTS":
      text = "bình luận bài viết";
      break;

    default:
      text = "gửi lời mời kết bạn";
  }
  return text;
};

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      notiCount: 0
    };
  }

  press(id, stuffID, friend) {
    this.props
      .updateseen({
        variables: { _id: id }
      })
      .then(res => {
        this.props.getNotification.refetch();
      })
      .then(res => {
        if (stuffID !== null) {
          return this.props.dispatch(
            NavigationActions.navigate({
              routeName: "PostDetail",
              params: {
                postID: stuffID,
                limit: 10
              }
            })
          );
        }
        if (friend === "ACCEPTED_FRIEND" && "FRIEND_REQUEST") {
          return this.props.dispatch(
            NavigationActions.navigate({
              routeName: "FriendBox",
              params: {
                postID: stuffID,
                limit: 10
              }
            })
          );
        }
        return this.props.dispatch(
          NavigationActions.navigate({
            routeName: "BlankScreen",
            params: {
              postID: stuffID,
              limit: 10
            }
          })
        );
      })
      .catch(error => {
        throw error;
      });
  }

  end() {
    if (this.props.getNotification.notifications.pageInfo.hasNextPage && !this.state.refreshing) {
      this.setState({ refreshing: true }, () => {
        this.props.load().then(() => {
          this.setState({ refreshing: false });
        });
      });
    }
  }

  render() {
    const { getNotification } = this.props;

    if (getNotification.loading) {
      return <ActivityIndicator size="small" color="#00ff00" />;
    }

    if (getNotification.error) {
      return <Text>An unexpected error occurred</Text>;
    }

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
              <Button transparent>
                <Icon name="md-settings" />
              </Button>
            </Right>
          </Header>
          <Content style={styles.container}>
            <FlatList
              keyExtractor={index => index._id}
              contentContainerStyle={{ alignSelf: "stretch" }}
              onEndReached={this.end.bind(this)}
              onEndReachedThreshold={0.1}
              refreshing={this.state.refreshing}
              data={getNotification.notifications.edges}
              ListFooterComponent={() =>
                getNotification.notifications.pageInfo.hasNextPage === true ? <ActivityIndicator /> : <View />
              }
              renderItem={(item, index) => {
                const stuff = item.item.subject;
                const friend = item.item.type;
                return (
                  <TouchableOpacity
                    onPress={this.press.bind(this, item.item._id, stuff == null ? null : stuff._id, friend)}
                    style={
                      item.item.isRead === false
                        ? { backgroundColor: "#e7e7e7e3", margin: 5, flexDirection: "row" }
                        : { backgroundColor: "white", margin: 5, flexDirection: "row" }
                    }
                  >
                    <Thumbnail
                      style={{ height: Dimensions.get("window").height / 12, marginLeft: 10 }}
                      square
                      source={{
                        uri:
                          item.item.actors.length !== 0
                            ? item.item.actors[0].profile.picture
                            : "https://cdn.iconscout.com/public/images/icon/free/png-512/docker-logo-363aabd4e875acdd-512x512.png"
                      }}
                    />
                    <View
                      style={{
                        height: Dimensions.get("window").height / 12,
                        width: Dimensions.get("window").width / 0.8,
                        padding: 5
                      }}
                    >
                      <Text style={{ padding: 3 }}>
                        {item.item.actors.length === 0
                          ? "BQL"
                          : item.item.actors.length < 2
                            ? item.item.actors[0].username
                            : item.item.actors[0].username + " & " + (item.item.actors.length - 1) + " người khác"}{" "}
                        {Cases(item.item.type)}
                      </Text>
                      <Text style={{ paddingLeft: 10 }} note>
                        {" "}
                        {distanceInWordToNow(item.item.createdAt)} ago ...{" "}
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
  query notifications($limit: Int, $cursor: String) {
    notifications(limit: $limit, cursor: $cursor) {
      pageInfo {
        endCursor
        hasNextPage
        total
        limit
      }
      edges {
        _id
        isRead
        createdAt
        updatedAt
        type
        subject {
          messagePlainText
          totalLikes
          _id
        }
        actors {
          _id
          username
          profile {
            picture
          }
          email {
            address
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

const NotificationWithData = compose(
  connect(null, dispatch => ({
    dispatch
  })),
  graphql(NotificationQuery, {
    name: "getNotification",
    options: () => ({
      variables: { limit: 10 },
      fetchPolicy: "network-only"
    }),
    props: ({ getNotification }) => {
      const { fetchMore, notifications } = getNotification;
      const cursor = (notifications && notifications.pageInfo && notifications.pageInfo.endCursor) || 1;
      const limit = (notifications && notifications.pageInfo && notifications.pageInfo.limit) || 10;
      const load = () =>
        fetchMore({
          variables: { cursor, limit },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.notifications.edges;
            const pageInfo = fetchMoreResult.notifications.pageInfo;
            return update(previousResult, {
              notifications: {
                edges: { $push: newEdges },
                pageInfo: { $set: pageInfo }
              }
            });
          }
        });
      return { getNotification, load };
    }
  }),
  graphql(UpdateReadPost, { name: "updateseen" })
)(Notification);

export default NotificationWithData;
