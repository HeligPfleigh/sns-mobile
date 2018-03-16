import React, { Component } from "react";
import { Platform } from "react-native";
import { connect } from "react-redux";
import update from "immutability-helper";
import { Container, Header, View, Footer, FooterTab } from "native-base";

import { FTButton } from "../../components/FooterTab";
import { graphql, compose, withApollo } from "react-apollo";
import { ActivityIndicator, FlatList } from "react-native";

import GET_FEEDS_QUERY from "../../graphql/queries/feeds";
import ME_QUERY from "../../graphql/queries/me";
import FeedCard from "../../components/FeedCard/FeedCard";
import FeedsHeader from "../../components/FeedsHeader";
import styles from "./styles";

@compose(
  connect(({ common }) => ({
    orientation: common.orientation
  })),
  withApollo,
  graphql(GET_FEEDS_QUERY, {
    name: "getFeeds",
    options: () => ({
      variables: { limit: 10 },
      fetchPolicy: "network-only"
    }),
    props: ({ getFeeds }) => {
      const { fetchMore, feeds } = getFeeds;
      const cursor = (feeds && feeds.pageInfo && feeds.pageInfo.endCursor) || 1;
      const limit = (feeds && feeds.pageInfo && feeds.pageInfo.limit) || 10;
      const loadMoreRows = () =>
        fetchMore({
          variables: { cursor, limit },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.feeds.edges;
            const pageInfo = fetchMoreResult.feeds.pageInfo;
            return update(previousResult, {
              feeds: {
                edges: { $push: newEdges },
                pageInfo: { $set: pageInfo }
              }
            });
          }
        });
      return { getFeeds, loadMoreRows };
    }
  }),
  graphql(ME_QUERY, { name: "getMe" })
)
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    props.navigation.navigate("DrawerClose");

    this.state = {
      page: 0,
      loading: false,
    };
  }

  _renderItem = ({ item }) => <FeedCard {...item} />

  _renderFeedHeader = () => {
    const { getMe } = this.props;
    return <FeedsHeader info={getMe.me} />;
  }

  _handleEnd = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        if (this.props.getFeeds.feeds.pageInfo.hasNextPage){
          this.props.loadMoreRows();
        }
      }
    );
  }

  render() {
    const { getMe, getFeeds } = this.props;

    let content;
    if (getFeeds.loading || getMe.loading) {
      content = <ActivityIndicator size="large" />;
    } else {
      content = (
        <FlatList
          contentContainerStyle={{ alignSelf: "stretch" }}
          data={getFeeds.feeds.edges}
          onEndReached={() => this._handleEnd()}
          onEndReachedThreshold={0}
          ListFooterComponent={() =>
            this.state.loading ?
            null : <ActivityIndicator size="large"/>}
          ListHeaderComponent={this._renderFeedHeader}
          keyExtractor={item => item._id}
          renderItem={this._renderItem}
        />
      );
    }

    return (
      <Container>
        {Platform.OS === "ios" && <Header style={{ height: 22 }} />}
        <View style={styles.root}>{content}</View>
        <Footer>
          <FooterTab>
            <FTButton active text="Trang chủ" name="home" iconStyle={{ fontSize: 23 }} />
            <FTButton text="Tin nhắn" name="chatbubbles" iconStyle={{ fontSize: 23 }} />
            <FTButton text="Kết bạn" name="contacts" iconStyle={{ fontSize: 23 }} />
            <FTButton text="Thông báo" name="notifications" iconStyle={{ fontSize: 23 }} />
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default HomeScreen;
