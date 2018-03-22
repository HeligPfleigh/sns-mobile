import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import HeaderAvatar from "./HeaderAvatar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  avatarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  inputContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: "stretch",
    padding: 10,
  }
});

class AddCommentSection extends Component{
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <HeaderAvatar />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Add your comment here!"/>
        </View>
      </View>
    );
  }
}

export default AddCommentSection;
