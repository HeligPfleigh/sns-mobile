import React, { Component } from "react";
import { Platform } from "react-native";
import { Container, Header, View } from "native-base";

import styles from "./styles";

class Layout extends Component {
  render() {
    return (
      <Container style={styles.container}>
        {Platform.OS === "ios" && <Header style={{ height: 22 }} />}
        <View style={{ flex: 1 }}>{this.props.children}</View>
      </Container>
    );
  }
}

export default Layout;
