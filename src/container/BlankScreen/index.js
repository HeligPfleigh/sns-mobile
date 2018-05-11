import React, { Component } from "react";
import {
  Text,
  Container,
  Header,
  Content
} from "native-base";
import { Dimensions } from "react-native";

import Layout from "../../components/Layout";
import styles from "./styles";

class BlankPageContainer extends Component {

  render() {

    return (
      <Layout navigation={this.props.navigation}>
        <Container>
          <Header />
          <Content>
            <Text> ... </Text>
          </Content>
        </Container>
      </Layout>
    );
  }
}

export default BlankPageContainer;
