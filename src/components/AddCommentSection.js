import React, { Component } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Platform, Keyboard } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";

import { colors } from "../constants";
import HeaderAvatar from "./HeaderAvatar";
import CREATE_NEW_COMMENT from "../graphql/mutations/createNewComment";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.WHITE,
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
  },
  postButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  }
});

@compose(
  connect(
    ({ userInfo }) => ({
      avatar: userInfo.profile.picture,
    })
  ),
  graphql(CREATE_NEW_COMMENT, {name: "createNewComment"}),
)
class AddCommentSection extends Component{
  state = {
    text: ""
  }

  _onChangeText = text => this.setState({ text });

  _handlePressAddComment = () => {
    const { text } = this.state;
    const { postId } = this.props;
    this.props.createNewComment({
      variables: {
        _id: postId,
        message: text,
        commentId: null,
        isMobile: true,
      },
      refetchQueries: ["post", "feeds"]
    });
    Keyboard.dismiss();
    this.textInput.clear();
    this.setState({ text: "" });
  }

  render(){
    const { avatar } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <HeaderAvatar avatar={avatar}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            ref={input => { this.textInput = input; }}
            placeholder="Add your comment here!"
            multiline={true}
            selectionColor={Platform.OS === "ios" && colors.PRIMARY}
            onChangeText={this._onChangeText}
            />
        </View>
        <TouchableOpacity onPress={this._handlePressAddComment}
          style={[styles.postButtonContainer, { display: this.state.text.length > 0 ? "flex" : "none" }]}>
          <MaterialIcons name="send" size={20} color={colors.PRIMARY}/>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AddCommentSection;
