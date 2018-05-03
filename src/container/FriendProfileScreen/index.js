import React, { Component } from "react";
import { Header, Icon, Left, Button, Body, Right, Container } from "native-base";
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
      return (
        <Layout navigation={this.props.navigation} style={styles.container}>
          <Container>
            <Header>
              <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                  <Icon name="ios-arrow-back" />
                </Button>
              </Left>
              <Body />
              <Right />
            </Header>
              <Wall info={info} data={data}/>
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
