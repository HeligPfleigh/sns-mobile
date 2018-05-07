import React, { Component } from "react";
import { Container } from "native-base";
import { ActivityIndicator } from "react-native";
import { graphql } from "react-apollo";

import Layout from "../../components/Layout";
import styles from "./styles";
import Wall from "./Details/Wall";
import USER_QUERY from "../../graphql/queries/user";

class FriendProfile extends Component {
  render() {
    if (this.props.loading) {
      return <ActivityIndicator style={{ justifyContent: "center" }} />;
    }

    if (this.props.data.user) {
      const info = this.props.data.user;
      const data = this.props.data;
      const navigation = this.props.navigation;

      return (
        <Layout navigation={this.props.navigation} style={styles.container}>
          <Container>
            <Wall info={info} data={data} navigation={navigation}/>
          </Container>
        </Layout>
      );
    }
    return <ActivityIndicator style={{ justifyContent: "center" }} />;
  }
}

const FriendProfileWithData = graphql(USER_QUERY, {
  options: ownProps => {
    return {
      variables: { _id: ownProps.navigation.state.params.id }
    };
  }
})(FriendProfile);

export default FriendProfileWithData;
