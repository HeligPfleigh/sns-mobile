import React, { Component } from "react";
import { View, Header, Left, Body, Right, Button, Title, Icon } from "native-base";
import { connect } from "react-redux";
import { compose, graphql } from "react-apollo";
import { NavigationActions } from "react-navigation";
import update from "immutability-helper";
import { FlatList, ActivityIndicator } from "react-native";

import GET_LIST_EVENTS from "../../graphql/queries/listEvent";
import EventCard from "../../components/EventCard/EventCard";
import ListEventsHeader from "../../components/EventCard/ListEventsHeader";
import { colors } from "../../constants";

@compose(
  connect(
    null,
    dispatch => ({ dispatch })
  ),
  graphql(GET_LIST_EVENTS, {
    name: "getListEvents",
    options: () => ({
      variables: { limit: 5 },
    }),
    props: ({ getListEvents }) => {
      const { fetchMore, listEvent } = getListEvents;
      const cursor = (listEvent && listEvent.pageInfo && listEvent.pageInfo.endCursor) || 1;
      const limit = (listEvent && listEvent.pageInfo && listEvent.pageInfo.limit) || 5;
      const loadMoreRows = () =>
        fetchMore({
          variables: { cursor, limit },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.listEvent.edges;
            const pageInfo = fetchMoreResult.listEvent.pageInfo;
            return update(previousResult, {
              listEvent: {
                edges: { $push: newEdges },
                pageInfo: { $set: pageInfo }
              }
            });
          }
        });
      return { getListEvents, loadMoreRows };
    }
  }),
)
class ListEventsContainer extends Component {
  state = {
    refreshing: false,
  }

  _handlePressBack = () => this.props.dispatch(NavigationActions.back());

  _renderEvent = ({ item }) => <EventCard {...item}/>

  _handleEnd = () => {
    if (this.props.getListEvents.listEvent.pageInfo.hasNextPage && !this.state.refreshing) {
      this.setState({ refreshing: true }, () => {
        this.props.loadMoreRows().then(() => {
          this.setState({ refreshing: false });
        });
      });
    }
  }

  render() {
    const { getListEvents } = this.props;
    const { refreshing } = this.state;
    let listEventsContent;

    if (getListEvents.loading) {
      listEventsContent = <ActivityIndicator size="large" />;
    }
    else {
      listEventsContent = (
        <FlatList
          contentContainerStyle={{ alignSelf: "stretch" }}
          data={getListEvents.listEvent.edges}
          keyExtractor={item => item._id}
          renderItem={this._renderEvent}
          onEndReached={this._handleEnd}
          onEndReachedThreshold={0.1}
          refreshing={refreshing}
          ListHeaderComponent={() => <ListEventsHeader />}
          ListFooterComponent={() => (!refreshing ? null : <ActivityIndicator size="large" />)}
          showsHorizontalScrollIndicator={false}
        />
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Left>
            <Button transparent onPress={this._handlePressBack}>
              <Icon type="MaterialIcons" name="arrow-back" style={{ fontSize: 20, color: colors.PRIMARY }} />
            </Button>
          </Left>
          <Body>
            <Title>Sự kiện</Title>
          </Body>
          <Right />
        </Header>

        {listEventsContent}
      </View>
    );
  }
}

export default ListEventsContainer;
