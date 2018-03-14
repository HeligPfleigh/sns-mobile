import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Header, Title, Content, View, Icon, Left, Body, Right } from "native-base";

import FeedCard from "../../components/FeedCard/FeedCard";
import styles from "./styles";

@connect(({ common }) => ({
  orientation: common.orientation
}))
class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Icon active name="menu" color="lightgrey" onPress={() => this.props.navigation.navigate("DrawerOpen")} />
          </Left>
          <Body>
            <Title style={{ fontSize: 11 }}>Màn hình chủ</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.root}>
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
          </View>
        </Content>
      </Container>
    );
  }
}

export default HomeScreen;
