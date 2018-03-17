import React, { Component } from "react";
import { Platform } from "react-native";
import { Container, Header, Content } from "native-base";

import styles from "./styles";

class Layout extends Component {
  render() {
    return (
      <Container style={styles.container}>
        {Platform.OS === "ios" && <Header style={{ height: 22 }} />}
        <Content>{this.props.children}</Content>
      </Container>
    );
  }
}

export default Layout;
