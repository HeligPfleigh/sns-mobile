import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from "react-native";
import { connect } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ModalDropdown from "react-native-modal-dropdown";

import { colors } from "../../constants";
import HeaderAvatar from "../HeaderAvatar";
import SharedPost from "./SharedPost";

const styles = StyleSheet.create({
  headerContainer: {
    height: "10%",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  avatar: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    height: "80%",
  },
  bottom: {
    height: "10%",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  input: {
    width: "90%",
    margin: 2,
    fontSize: 16,
    color: colors.SECONDARY,
  },
  postButton: {
    backgroundColor: colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 30,
    marginHorizontal: 10,
  },
  postButtonText: {
    color: colors.WHITE,
    fontSize: 16,
  },
});

@connect(
  ({ userInfo }) => ({
    profile: userInfo.profile,
    id: userInfo._id,
    friends: userInfo.friends,
  }),
  dispatch => ({ dispatch })
)
class SharedModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      friendIdx: 0,
      text: null,
    };
  }

  _onChangeText = text => this.setState({ text });

  render(){
    const { profile, id, onToggleSharingModal, friends, sharingPostID } = this.props;
    const { text } = this.state;
    const friendsName = friends.map(item => item.username);
    return (
      <View style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"}}>
        <View style={{
                width: 300,
                height: 400, backgroundColor: colors.WHITE}}>

          <View style={styles.headerContainer}>
            <View style={styles.avatar} >
              <HeaderAvatar avatar={profile.picture} id={id}/>
            </View>
            <View style={{flex: 4, justifyContent:"center", alignItems:"center"}}>
              <ModalDropdown
                textStyle={{fontSize: 16}}
                dropdownTextStyle={{fontSize: 16}}
                options={friendsName}
                defaultValue={friendsName[0]}
                onSelect={(index, value)=>this.setState({friendIdx: index})}/>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={() => onToggleSharingModal(false)}>
              <MaterialIcons name="close" size={30} color={colors.LIGHT_GRAY} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            <TextInput style={styles.input}
                onChangeText={this._onChangeText}
                multiline={true}
                value={text}
                placeholder={"Thêm suy nghĩ của bạn"}
                maxLength={50}
                underlineColorAndroid="rgba(0,0,0,0)"
              />
            {sharingPostID ? <SharedPost postID={sharingPostID}/> : null}
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity style={styles.postButton}>
                <Text style={styles.postButtonText}>Đăng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default SharedModal;
