import React, { Component } from "react";
import { Text, Tab, Tabs, TabHeading, Icon } from "native-base";

import Layout from "../../components/Layout";
import FriendSearch from "./friendBoxComponents/FriendSearch";
import FriendRequest from "./friendBoxComponents/FriendRequest";

class FriendsBox extends Component {
  render() {
    return (
      <Layout navigation={this.props.navigation}>
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
