import React, { Component } from "react";
import {  StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import {    Button } from "native-base";
import io from "socket.io-client";

export default class Screen extends Component {
  constructor(props) {
    super(props);
    this.socket = io("http://localhost:3000");

    this.socket.emit("onlineUsers");

    this.socket.on("onlineUsersQuery", data => {
      this.setState({
        onlineUsers: data
      });
    });

    this.socket.on("roomsQuery", data => {
      this.setState({
        roomNumber: data
      });
    });

    this.socket.on("createdRoom", data => {
      this.setState({
        currentRoom: data
      });
    });

    this.socket.on("chattingQuery", data => {
      this.state.chattingQuery.push(data);
      this.setState(this.state);
    });

    this.socket.on("someoneType", data => {
      this.setState({
        typing: data
      });
    });

    this.socket.on("someoneDoneType", data => {
      this.setState({
        typing: ""
      });
    });

    this.state = {
      account: "",
      username: "",
      onlineUsers: [],
      text: "",
      data: [],
      name: "",
      typing: "",
      roomName: "",
      roomNumber: [],
      currentRoom: "",
      chattingMessage: "",
      chattingQuery: [],
      fetchDataHistory: []
    };
  }

  logout(account) {
    this.socket.emit("logout", account);
    this.props.navigation.goBack();
  }

  createRoom() {
    this.socket.emit("roomName", this.state.roomName);
  }

  send(account) {
    this.socket.emit("chatting", {
      message: this.state.chattingMessage,
      account: account
    });
    this.setState({
      chattingMessage: ""
    });
  }

  render() {
    const account = this.props.navigation.state.params.account;
    return (
      <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false}>
        <Text style={{ paddingTop: 50 }}>Welcome to FakeYahoo {account}</Text>
        <View style={{ paddingTop: 20 }}>
          <Text> people online : </Text>
          <View
            style={{
              width: 350,
              height: 50,
              borderWidth: 1,
              flexDirection: "row"
            }}
          >
            {this.state.onlineUsers.map((e, i) => {
              return (
                <Text key={i} style={{ flexDirection: "row" }}>
                  {" "}
                  {e}{" "}
                </Text>
              );
            })}
          </View>
        </View>
        <Text> Creat/Join a chat room you choose </Text>
        <TextInput
          placeholder="create a room .."
          onChangeText={roomName => this.setState({ roomName })}
          value={this.state.roomName}
          style={{ width: 350, borderWidth: 1, marginTop: 10, height: 50 }}
        />
        <Button onPress={this.createRoom.bind(this)} style={{ width: 350, marginTop: 20 }}>
          <Text style={{ color: "white" }}> Type room before create/join one</Text>
        </Button>

        <Button onPress={this.logout.bind(this, account)} style={{ width: 350, marginTop: 20 }}>
          <Text style={{ color: "white" }}> Logging out</Text>
        </Button>

        <View style={{ marginTop: 50 }}>
          <Text> Available rooms : </Text>
          {this.state.roomNumber.map((e, i) => {
            return <Text key={i}> {e} </Text>;
          })}
        </View>

        <View style={{ marginTop: 50 }}>
          <Text> Current room : </Text>
          <Text> {this.state.currentRoom} </Text>
        </View>

        <View>
          <View style={{ width: 350, height: 500, borderWidth: 1, margin: 20 }}>
            <View style={{ flexDirection: "column" }}>
              {this.state.chattingQuery.map((e, i) => {
                return (
                  <Text key={i} style={{ flexDirection: "column" }}>
                    {" "}
                    {e.account} {e.message}{" "}
                  </Text>
                );
              })}
            </View>
          </View>
          <Text style={{ paddingTop: 10, paddingLeft: 20 }}> {this.state.typing} </Text>
          <Text style={{ paddingTop: 10, paddingLeft: 20 }}> Chatting </Text>
          <View style={{ flexDirection: "row", borderWidth: 1, marginLeft: 20 }}>
            <TextInput
              placeholder="write.."
              style={{ width: 250, borderWidth: 1 }}
              onChangeText={chattingMessage => this.setState({ chattingMessage })}
              onFocus={() => {
                this.socket.emit("onTyping", account);
              }}
              onBlur={() => {
                this.socket.emit("offTyping", account);
              }}
              value={this.state.chattingMessage}
            />
            <Button onPress={this.send.bind(this, account)} style={{ width: 100 }}>
              <Text style={{ color: "white" }}> Send</Text>
            </Button>
          </View>
        </View>

        <View style={{ height: 500 }} />
      </ScrollView>
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
