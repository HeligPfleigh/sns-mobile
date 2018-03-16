import React, { Component } from "react"

import {
  Container,
  Header,
  Title,
  View,
  Content,
  Text,
  Button,
  FooterTab,
  Left,
  Right,
  Body,
  Tab,
  Tabs,
  TabHeading
} from "native-base"

import Icon from "react-native-vector-icons/FontAwesome"
import styles from "./styles"
import Tab1 from "./friendBoxComponents/tab1"
import Tab3 from "./friendBoxComponents/tab3"

class FriendsBox extends Component {
  render() {
    const param = this.props.navigation.state.params
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="angle-left" style={{ fontSize: 27 }} />
            </Button>
          </Left>

          <Body style={{ flex: 3 }}>
            <Title>
              <Text>Friends box</Text>
            </Title>
          </Body>

          <Right />
        </Header>

        <Content padder>
          <Tabs>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="search" />
                  <Text>Tìm kiếm</Text>
                </TabHeading>
              }
            >
              <Tab1 />
            </Tab>

            <Tab
              heading={
                <TabHeading>
                  <Icon name="user-plus" />
                  <Text>Yêu cầu</Text>
                </TabHeading>
              }
            >
              <Tab3 />
            </Tab>
          </Tabs>
        </Content>
      </Container>
    )
  }
}

export default FriendsBox
