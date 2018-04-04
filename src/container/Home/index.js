import React, { Component } from "react";
import { connect } from "react-redux";
import update from "immutability-helper";
import { View } from "native-base";
import { graphql, compose, withApollo } from "react-apollo";
import { ActivityIndicator, FlatList } from "react-native";

import * as utils from "../../utils/common";
import { SPINNER_CHANGE } from "../../constants";
import Layout from "../../components/Layout";
import FeedCard from "../../components/FeedCard/FeedCard";
import FeedsHeader from "../../components/FeedsHeader";
import GET_FEEDS_QUERY from "../../graphql/queries/feeds";
import ME_QUERY from "../../graphql/queries/me";
import POST_ADDED_SUBSCRIPTION from "../../graphql/subscriptions/postAdded";
import styles from "./styles";
export const SAVE_USER_INFO = "SAVE_USER_INFO";

@compose(
  connect(({ common }) => ({
    orientation: common.orientation
  })),
  withApollo,
  graphql(GET_FEEDS_QUERY, {
    name: "getFeeds",
    options: () => ({
      variables: { limit: 5 },
      fetchPolicy: "network-only"
    }),
    props: ({ getFeeds }) => {
      const { fetchMore, feeds } = getFeeds;
      const cursor = (feeds && feeds.pageInfo && feeds.pageInfo.endCursor) || 1;
      const limit = (feeds && feeds.pageInfo && feeds.pageInfo.limit) || 5;
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
    this.state = {
      page: 0,
      loading: false
    };
    if (this.props.getMe.me) {
      this.props.dispatch(utils.createAction(SAVE_USER_INFO, this.props.getMe.me));
    }
    props.navigation.navigate("DrawerClose");
    if (props.dispatch) {
      props.dispatch(utils.createAction(SPINNER_CHANGE, false));
    }
  }

  componentDidMount(){
    this.props.getFeeds.subscribeToMore({
      document: POST_ADDED_SUBSCRIPTION,
      updateQuery : (prev, { subscriptionData }) => {
        // Hot fix: (need resolve careful later)
        // sometime it's called duplicate here which caused runtime error(duplicate post in home screen)
        let newEdges;
        if (prev.feeds.edges[0]._id !== subscriptionData.data.postAdded._id){
          newEdges = [subscriptionData.data.postAdded, ...prev.feeds.edges];
        }
        else {
          newEdges = prev.feeds.edges;
        }

        const pageInfo = prev.feeds.pageInfo;
        return update(prev, {
          feeds: {
            edges: { $set: newEdges },
            pageInfo: { $set: pageInfo }
          }
        });
      }
    });
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
        if (this.props.getFeeds.feeds.pageInfo.hasNextPage) {
          this.props.loadMoreRows();
        }
      }
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.getMe.me && nextProps.getMe.me !== this.props.getMe.me) {
      this.props.dispatch(utils.createAction(SAVE_USER_INFO, nextProps.getMe.me));
    }
  }

  render() {
    const { getMe, getFeeds } = this.props;
    let content;
    if (getFeeds.loading || getMe.loading) {
      content = <ActivityIndicator size="large" />;
    } else {
      content = (
        <FlatList
          horizontal
          contentContainerStyle={{ alignSelf: "stretch" }}
          data={getFeeds.feeds.edges}
          onEndReached={this._handleEnd}
          onEndReachedThreshold={0}
          ListFooterComponent={() => (this.state.loading ? null : <ActivityIndicator size="large" />)}
          keyExtractor={item => item._id}
          renderItem={this._renderItem}
        />
      );
    }

    return (
      <Layout navigation={this.props.navigation}>
        {getMe.me ? (
          <View style={{ height: 100 }}>
            <FeedsHeader info={getMe.me} />
          </View>
        ) : null}
        <View style={styles.root}>{content}</View>
      </Layout>
    );
  }
}

export default HomeScreen;
