import React, { Component } from "react";
import { Icon, Header, View, Left, Body, Title, Right, Button } from "native-base";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { compose, graphql } from "react-apollo";
import { isEmpty } from "lodash";

import { colors } from "../../constants";
import GET_EVENT_DETAIL from "../../graphql/queries/event";
import EventScreen from "./EventScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: colors.WHITE,
  },
  eventIsRemovedContainer: {
    flex: 1,
    alignItems: "center",
  },
  eventIsRemovedText:{
    color: colors.PRIMARY,
    fontSize: 14,
    padding: 20,
  },
});

const eventIsRemovedText = "Oop! Bài viết này đã bị xoá hoặc không còn khả dụng";

@compose(
  connect(
    null,
    (dispatch) => ({dispatch}),
  ),
  graphql(GET_EVENT_DETAIL, {
    options: ownProps => {
      return {
        variables: {
          _id: ownProps.navigation.state.params.eventID,
        }
      };
    }
  }),
)
class EventDetailContainer extends Component {
  render() {
    const { data: { event, loading }} = this.props;

    let content;
    if ( loading ){
      content = <ActivityIndicator size="large"/>;
    }
    else {
      if ( !isEmpty(event) ){
        content = <EventScreen event={event} />;
      }
      else {
        content =
          <View style={styles.postIsRemovedContainer}>
            <Text style={styles.postIsRemovedText}>
              {eventIsRemovedText}
            </Text>
          </View>;
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.dispatch(NavigationActions.back())}>
              <Icon type="MaterialIcons" name="arrow-back" style={{ fontSize: 20, color: colors.PRIMARY }} />
            </Button>
          </Left>
          <Body>
            <Title>{event ? event.name : "Sự kiện"}</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.container}>{content}</View>
      </View>
    );
  }
}

export default EventDetailContainer;
