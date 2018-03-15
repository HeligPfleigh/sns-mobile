import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Header, Title, Content, View, Left, Body, Right, Footer, Button, FooterTab } from "native-base";

import FeedCard from "../../components/FeedCard/FeedCard";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";

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
        <Footer>
          <FooterTab>
            <Button transparent>
              <Icon name="home" style={{ fontSize: 20, color: "#008ffe" }} />
            </Button>
            <Button transparent>
              <Icon name="comments" style={{ fontSize: 20, color: "#008ffe" }} />
            </Button>
            <Button transparent>
              <Icon name="group" style={{ fontSize: 20, color: "#008ffe" }} />
            </Button>
            <Button transparent>
              <Icon name="bell" style={{ fontSize: 20, color: "#008ffe" }} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default HomeScreen;
