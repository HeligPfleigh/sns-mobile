import React, { Component } from "react";
import {  Content, Text, Button } from "native-base";

import Layout from "../../components/Layout";
import styles from "./styles";

class BlankPageContainer extends Component {
  render() {
    const param = this.props.navigation.state.params;
    return (
      <Layout navigation={this.props.navigation}>
        <Content padder>
          <Text>{param !== undefined ? param.name.item : "Create Something Awesome . . ."}</Text>
          <Button block style={styles.btnLogin} onPress={() => this.props.navigation.navigate("DrawerOpen")}>
            <Text>Yooo</Text>
          </Button>
        </Content>
      </Layout>
    );
  }
}

export default BlankPageContainer;
