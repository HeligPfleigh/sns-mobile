import React, { Component } from "react";
import { Content, Header, Icon, Left, Button, Body, Title, Right, Container } from "native-base";
import { ActivityIndicator } from "react-native";
import Layout from "../../components/Layout";
import styles from "./styles";

class ProfileContainer extends Component {
  render() {
    if (this.props.loading) {
      return <ActivityIndicator style={{ justifyContent: "center" }} />;
    }

    if (this.props.data.user) {
      return (
        <Layout navigation={this.props.navigation} style={styles.container}>
          <Container>
            <Header>
              <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                  <Icon name="ios-arrow-back" />
                </Button>
              </Left>
              <Body>
                <Title style={{ fontSize: 15 }}> Thông tin cá nhân </Title>
              </Body>
              <Right>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                  <Icon name="md-settings" />
                </Button>
              </Right>
            </Header>
            <Content padder style={{ backgroundColor: "#fff" }} />
          </Container>
        </Layout>
      );
    }
    return <ActivityIndicator style={{ justifyContent: "center" }} />;
  }
}

export default ProfileContainer;
