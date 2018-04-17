import React, { Component } from "react";
import { View, TextInput, TouchableOpacity, Text, Keyboard } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import Layout from "../Layout";
import { colors } from "../../constants";
import styles from "./styles";
import HeaderAvatar from "../HeaderAvatar";

const MAX_MESSAGE_CHARACTER = 300;

@connect(
  ({ userInfo }) => ({
    profile: userInfo.profile,
    id: userInfo._id,
  }),
  dispatch => ({ dispatch })
)
class CRUDPost extends Component{
  constructor(props){
    super(props);
    this.state = {
      text: this.props.message || "",
    };
  }

  _onChangeText = text => this.setState({ text });

  get _textLength() {
    return MAX_MESSAGE_CHARACTER - this.state.text.length;
  }

  get _buttonDisabled() {
    return this.state.text.length < 5;
  }

  _handleClose = () => {
    Keyboard.dismiss();
    this.props.dispatch(NavigationActions.back());
  }

  render() {
    const { profile, handlePressPost, id } = this.props;
    return (
      <Layout navigation={this.props.navigation}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.avatar} >
              <HeaderAvatar avatar={profile.picture} id={id}/>
            </View>
            <View style={{flex: 4}} />
            <TouchableOpacity style={styles.backButton} onPress={this._handleClose}>
              <MaterialIcons name="close" size={30} color={colors.LIGHT_GRAY} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            <TextInput style={styles.input}
              onChangeText={this._onChangeText}
              multiline={true}
              value={this.state.text}
              placeholder={!this.props.message ? "What's happening?" : ""}
              maxLength={MAX_MESSAGE_CHARACTER}
              underlineColorAndroid="rgba(0,0,0,0)"
              autoFocus={true}
            />
          </View>
          <View style={styles.bottomContainer}>
           <View style={styles.mediaContainer}>
              <TouchableOpacity style={styles.mediaButton}>
                <MaterialIcons name="attachment" size={30} color={colors.LIGHT_GRAY} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.mediaButton}>
                <MaterialIcons name="photo-camera" size={30} color={colors.LIGHT_GRAY} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection:"row", alignItems:"center", justifyContent:"flex-end"}}>
              <Text style={styles.textLength}>{this._textLength}</Text>
              <TouchableOpacity style={styles.postButton} disabled={this._buttonDisabled} onPress={() => handlePressPost(this.state.text)}>
                <Text style={styles.postButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Layout>
    );
  }
}

export default CRUDPost;
