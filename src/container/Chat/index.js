import React, { Component } from "react";
import { Content, Header, Icon, Left, Button, Body, Title, Right, Container } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  ActivityIndicator
} from "react-native";
import Layout from "../../components/Layout";
import io from "socket.io-client";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.socket = io("http://localhost:3000");

    this.socket.on("loggingFailed", () => {
      Alert.alert(
        "username already existed",
        "try others",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    });

    this.socket.on("loggingSucceed", async data => {
      await this.setState({
        username: data
      }),
        await Alert.alert(
          "Logging succeed",
          "move on plz",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "OK",
              onPress: () =>
                this.props.dispatch(
                  NavigationActions.navigate({
                    routeName: "Screen",
                    params: {
                      account: this.state.account,
                      online: this.state.onlineUsers
                    }
                  })
                )
            }
          ],
          { cancelable: false }
        );
    });

    this.state = {
      account: "",
      username: "",
      onlineUsers: [],
      text: "",
      data: [],
      name: "",
      typing: ""
    };
  }

  login() {
    this.socket.emit("logging", this.state.account);
  }
  render() {
    if (this.props.loading) {
      return <ActivityIndicator style={{ justifyContent: "center" }} />;
    }

    return (
      <Layout navigation={this.props.navigation}>
        <Container >
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="ios-arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={{ fontSize: 15 }}> FakeYahoo</Title>
            </Body>
            <Right />
          </Header>
          <Content padder style={{ backgroundColor: "#fff" }} >
            <View style={styles.container}>
              <View>
                <View>
                  <Image
                    style={{ width: 200, height: 200, marginTop: 100, marginLeft: 40 }}
                    source={{
                      uri: "https://seeklogo.com/images/Y/yahoo-icon-logo-E6A71C70FC-seeklogo.com.png"
                    }}
                  />

                  <Text style={{ paddingTop: 50 }}>Welcome to FakeYahoo {this.state.username}</Text>
                  <TextInput
                    placeholder="logging .."
                    onChangeText={account => this.setState({ account })}
                    value={this.state.account}
                    style={{ width: 300, marginTop: 20, borderWidth: 1, height: 50 }}
                  />
                  <Button onPress={this.login.bind(this)} style={{ width: 300, marginTop: 20 }} info>
                    <Text style={{ color: "white" }}> Logging in</Text>
                  </Button>
                </View>
              </View>
            </View>
          </Content>
        </Container>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 30
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

const ChatWithData = connect(({ dispatch }) => ({ dispatch }))(Chat);

export default ChatWithData;
