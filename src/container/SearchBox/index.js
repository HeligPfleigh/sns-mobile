import React, { Component } from "react";
import { Container, Header, Left, Body, Right, Button, Icon, Title } from "native-base";
import Layout from "../../components/Layout";
import FriendSearch from "./friendBoxComponents/FriendSearch";

class FriendsBox extends Component {
  render() {
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
              <Title> Tìm kiếm </Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name="md-settings" />
              </Button>
            </Right>
          </Header>


            <FriendSearch />
      </Container>
      </Layout>
    );
  }
}

export default FriendsBox;
