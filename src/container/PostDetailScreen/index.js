import React, { Component } from "react";
import {  Content, Text, Button } from "native-base";

import styles from "./styles";

class BlankPageContainer extends Component {
  render() {
    const param = this.props.navigation.state.params;
    return (
        <Content padder>
          <Text>{param !== undefined ? param.name.item : "Create Something Awesome . . ."}</Text>
          <Button block style={styles.btnLogin} onPress={() => this.props.navigation.navigate("DrawerOpen")}>
            <Text>Đăng nhập</Text>
          </Button>
        </Content>
    );
  }
}

export default BlankPageContainer;
