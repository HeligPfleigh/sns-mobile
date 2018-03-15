import React, { Component } from "react";
import { Platform } from "react-native";
import { connect } from "react-redux";
import { Container, Header, Content, View, Footer, Button, FooterTab, Text, Icon } from "native-base";

import { FTButton } from "../../components/FooterTab";
import FeedCard from "../../components/FeedCard/FeedCard";
import styles from "./styles";

@connect(({ common }) => ({
  orientation: common.orientation
}))
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    props.navigation.navigate("DrawerClose");
  }
  render() {
    return (
      <Container>
        {Platform.OS === "ios" && <Header style={{ height: 22 }} />}
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
            <FTButton active text="Trang chủ" name="home" iconStyle={{ fontSize: 23 }} />
            <FTButton text="Tin nhắn" name="chatbubbles" iconStyle={{ fontSize: 23 }} />
            <FTButton text="Kết bạn" name="contacts" iconStyle={{ fontSize: 23 }} />
            <FTButton text="Thông báo" name="notifications" iconStyle={{ fontSize: 23 }} />
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default HomeScreen;
