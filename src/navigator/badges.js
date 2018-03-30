import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { gql } from "apollo-boost";
import { ActivityIndicator, Text } from "react-native";

import ME_QUERY from "../graphql/queries/me";

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

const NumberQuery = gql`
  query {
    notifications {
      edges {
        isRead
      }
    }
  }
`;
const NotificationNumberWithData = compose(graphql(NumberQuery), graphql(ME_QUERY, { name: "total" }))(
  NotificationNumber
);
export default NotificationNumberWithData;
