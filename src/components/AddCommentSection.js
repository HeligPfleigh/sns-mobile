import React, { Component } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Keyboard, Platform } from "react-native";
import { Icon } from "native-base";
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
  },
  textInputAndroid: {
    width: "90%",
    height: 50,
  },
  textInputIOS: {
    width: "90%",
  },
});

@compose(
  connect(
    ({ userInfo }) => ({
      avatar: userInfo.profile.picture,
      id: userInfo._id,
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
    const { postId, commentID } = this.props;
    this.props.createNewComment({
      variables: {
        _id: postId,
        message: text,
        commentId: commentID,
        isMobile: true,
      },
      refetchQueries: ["post", "feeds", "comment"]
    });
    Keyboard.dismiss();
    this.textInput.clear();
    this.setState({ text: "" });
  }

  render(){
    const { avatar, id } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <HeaderAvatar avatar={avatar} id={id}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={Platform.OS === "ios" ? styles.textInputIOS : styles.textInputAndroid}
            ref={input => { this.textInput = input; }}
            placeholder="Add your comment here!"
            multiline={true}
            onChangeText={this._onChangeText}
            underlineColorAndroid="rgba(0,0,0,0)"
            />
        </View>
        <TouchableOpacity onPress={this._handlePressAddComment}
          style={[styles.postButtonContainer, { display: this.state.text.length > 0 ? "flex" : "none" }]}>
          <Icon type="MaterialIcons" name="send" style={{ fontSize: 20, color: colors.PRIMARY }}/>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AddCommentSection;
