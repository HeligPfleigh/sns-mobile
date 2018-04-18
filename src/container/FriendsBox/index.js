import React, { Component } from "react";
import { Text, Tab, Tabs, TabHeading, Icon, Header, Left, Button, Body, Right, Title } from "native-base";

import Layout from "../../components/Layout";
import FriendSearch from "./friendBoxComponents/FriendSearch";
import FriendRequest from "./friendBoxComponents/FriendRequest";

class FriendsBox extends Component {
  render() {
    return (
      <Layout navigation={this.props.navigation}>
        <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="ios-arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title> Bạn bè </Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name="md-settings" />
              </Button>
            </Right>
          </Header>

        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <Icon name="search" />
                <Text>Tìm kiếm</Text>
              </TabHeading>
            }
          >
            <FriendSearch />
          </Tab>

          <Tab
            heading={
              <TabHeading>
                <Icon name="md-person-add" />
                <Text>Yêu cầu</Text>
              </TabHeading>
            }
          >
            <FriendRequest />
          </Tab>
        </Tabs>
      </Layout>
    );
  }
}

export default FriendsBox;
