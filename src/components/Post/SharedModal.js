import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from "react-native";
import { connect } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ModalDropdown from "react-native-modal-dropdown";
import { graphql, compose } from "react-apollo";

import { colors, POST_PRIVACY } from "../../constants";
import HeaderAvatar from "../HeaderAvatar";
import SharedPost from "./SharedPost";
import SHARING_POST_MUTATION from "../../graphql/mutations/sharingPost";

const styles = StyleSheet.create({
  mainContainer: {
    width: 300,
    height: 400,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  headerContainer: {
    height: "10%",
    flexDirection: "row",
    alignSelf: "stretch"
  },
  avatar: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center"
  },
  backButton: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center"
  },
  wrapper: {
    height: "80%"
  },
  bottom: {
    height: "10%",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  input: {
    width: "90%",
    margin: 2,
    fontSize: 16,
    color: colors.SECONDARY
  },
  postButton: {
    backgroundColor: colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 30,
    marginHorizontal: 10
  },
  postButtonText: {
    color: colors.WHITE,
    fontSize: 16
  }
});

@compose(
  connect(
    ({ userInfo }) => ({
      profile: userInfo.profile,
      id: userInfo._id,
      friends: userInfo.friends
    }),
    dispatch => ({ dispatch })
  ),
  graphql(SHARING_POST_MUTATION, { name: "sharePost" })
)
class SharedModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendIdx: -1,
      text: null
    };
  }

  _onChangeText = text => this.setState({ text })

  _handlePressSubmit = async () => {
    const { text, friendIdx } = this.state;
    const { sharingPostID, friends, onToggleSharingModal } = this.props;
    if (!text || !text.length || friendIdx === -1) {
      return;
    }

    const friendId = friends[friendIdx]._id;
    await this.props.sharePost({
      variables: {
        _id: sharingPostID,
        message: text,
        isMobile: true,
        friendId,
        privacy: POST_PRIVACY[0]
      }
    });
    onToggleSharingModal(false);
  }

  render() {
    const { profile, id, onToggleSharingModal, friends, sharingPostID } = this.props;
    const { text } = this.state;
    const friendsName = friends.map(item => item.username);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.avatar}>
            <HeaderAvatar avatar={profile.picture} id={id} />
          </View>
          <View style={{ flex: 4, justifyContent: "center", alignItems: "center" }}>
            <ModalDropdown
              textStyle={{ fontSize: 16 }}
              dropdownTextStyle={{ fontSize: 16 }}
              options={friendsName}
              onSelect={(index, value) => this.setState({ friendIdx: index })}
            />
          </View>
          <TouchableOpacity style={styles.backButton} onPress={() => onToggleSharingModal(false)}>
            <MaterialIcons name="close" size={30} color={colors.LIGHT_GRAY} />
          </TouchableOpacity>
        </View>
        <View style={styles.wrapper}>
          <TextInput
            style={styles.input}
            onChangeText={this._onChangeText}
            multiline={true}
            value={text}
            placeholder={"Thêm suy nghĩ của bạn"}
            maxLength={50}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          {sharingPostID ? <SharedPost postID={sharingPostID} /> : null}
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.postButton} onPress={this._handlePressSubmit}>
            <Text style={styles.postButtonText}>Đăng</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SharedModal;
