import React, { Component } from "react";
import { StyleSheet, TextInput, Platform, TouchableOpacity, Text } from "react-native";
import { Thumbnail, View } from "native-base";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import Layout from "../../components/Layout";
import { colors, fakeAvatar } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.WHITE,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  avatar: {
    flex: 1,
    alignSelf: "stretch",
  },
  backButton: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    flex: 9,
    paddingTop: 5,
    alignItems: "center",
    position: "relative",
    alignSelf: "stretch",
    backgroundColor: colors.WHITE,
  },
  input: {
    height: "40%",
    width: "90%",
    fontSize: 18,
    color: colors.SECONDARY,
  },
  postButton: {
    backgroundColor: colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    top: "60%",
    right: "5%",
  },
  postButtonText: {
    color: colors.WHITE,
    fontSize: 16,
  },
  textLength: {
    fontSize: 18,
    color: colors.PRIMARY,
    position: "absolute",
    top: "45%",
    right: "10%",
  }
});

@connect(
  ({ common, nav }) => ({
    nav: nav,
    orientation: common.orientation
  }),
  dispatch => ({ dispatch })
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

  }

  _handleClose = () => {
    this.props.dispatch(NavigationActions.back());
  }

  render() {
    return (
      <Layout navigation={this.props.navigation}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.avatar} >
              <Thumbnail small source={{ fakeAvatar }} />
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
