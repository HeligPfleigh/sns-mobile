import React, { Component } from "react";
import { TextInput, Platform, TouchableOpacity, Text, Keyboard } from "react-native";
import { Thumbnail, View } from "native-base";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { NavigationActions } from "react-navigation";

import CREATE_NEW_POST from "../../graphql/mutations/createNewPost";
import Layout from "../../components/Layout";
import { colors, fakeAvatar } from "../../constants";
import styles from "./styles";

@compose(
  connect(
    ({ common, nav }) => ({
      nav: nav,
      orientation: common.orientation
    }),
    dispatch => ({ dispatch })
  ),
  graphql(CREATE_NEW_POST, {name: "createNewPost"}),
)
class NewFeedContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: "",
    };
  }

  _onChangeText = text => this.setState({ text });

  get _textLength() {
    return 140 - this.state.text.length;
  }

  get _buttonDisabled() {
    return this.state.text.length < 5;
  }

  _handlePressPost = () => {
    // const { text } = this.state;
    // this.props.createNewPost({
    //   variables: { message: text },
    // });
  }

  _handleClose = () => {
    Keyboard.dismiss();
    this.props.dispatch(NavigationActions.back());
  }

  render() {
    const { profile } = this.props.navigation.state.params.user;
    return (
      <Layout navigation={this.props.navigation}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.avatar} >
              <Thumbnail small source={{ uri: profile.picture || fakeAvatar }} />
            </View>
            <View style={{flex: 4}} />
            <TouchableOpacity style={styles.backButton} onPress={this._handleClose}>
              <EvilIcons name="close" size={30} color={colors.PRIMARY} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            <TextInput style={styles.input}
              onChangeText={this._onChangeText}
              multiline={true}
              placeholder="What's happening?"
              maxLength={140}
              selectionColor={Platform.OS === "ios" && colors.PRIMARY}
              autoFocus={true}
            />
            <Text style={styles.textLength}>{this._textLength}</Text>
          </View>
          <TouchableOpacity style={styles.postButton} disabled={this._buttonDisabled} onPress={this._handlePressPost}>
            <Text style={styles.postButtonText}>POST</Text>
          </TouchableOpacity>
        </View>
      </Layout>
    );
  }
}

export default NewFeedContainer;
