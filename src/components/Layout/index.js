import React, { Component } from "react";
import { Platform } from "react-native";
import { Container, Header, Content, Footer, FooterTab } from "native-base";

import { FTButton } from "../FooterTab";

class Layout extends Component {
  render() {
    return (
      <Container>
        {Platform.OS === "ios" && <Header style={{ height: 22 }} />}
        <Content>{this.props.children}</Content>
        <Footer>
          <FooterTab>
            <FTButton name="home" iconStyle={{ fontSize: 26 }} onPress={() => this.props.navigation.navigate("Home")} />
            <FTButton
              name="chatbubbles"
              iconStyle={{ fontSize: 26 }}
              onPress={() => this.props.navigation.navigate("BlankScreen")}
            />
            <FTButton
              name="contacts"
              active
              iconStyle={{ fontSize: 26 }}
              onPress={() => this.props.navigation.navigate("BlankScreen")}
            />
            <FTButton
              name="notifications"
              iconStyle={{ fontSize: 26 }}
              onPress={() => this.props.navigation.navigate("BlankScreen")}
            />
            <FTButton
              name="search"
              iconStyle={{ fontSize: 26 }}
              onPress={() => this.props.navigation.navigate("BlankScreen")}
            />
            <FTButton
              name="menu"
              iconStyle={{ fontSize: 26 }}
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            />
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Layout;
