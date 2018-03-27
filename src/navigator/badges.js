import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { gql } from "apollo-boost";
import { ActivityIndicator, Text } from "react-native";

class NotificationNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  render() {
    if (this.props.data.loading) {
      return <ActivityIndicator size="small" color="#00ff00" />;
    }

    if (this.props.data.error) {
      return <Text>An unexpected error occurred</Text>;
    }

    return <Text style={{ fontSize: 9 }}> .. </Text>;
  }
}
const totalQuery = gql`
  query {
    me {
      totalNotification
    }
  }
`;

const NumberQuery = gql`
  query {
    notifications {
      edges {
        isRead
      }
    }
  }
`;
const NotificationNumberWithData = compose(graphql(NumberQuery), graphql(totalQuery, { name: "total" }))(
  NotificationNumber
);
export default NotificationNumberWithData;
