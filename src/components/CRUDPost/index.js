import React, { Component } from "react";
import { View, TextInput, TouchableOpacity, Text, Keyboard, Image, ScrollView } from "react-native";
import { Icon } from "native-base";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import ImagePicker from "react-native-image-crop-picker";
import LottieAnimation from "lottie-react-native";
import ModalDropdown from "react-native-modal-dropdown";

import Layout from "../Layout";
import { colors, POST_PRIVACY_DISPLAY } from "../../constants";
import styles from "./styles";
import HeaderAvatar from "../HeaderAvatar";
import LottieAsset from "../../assets/lotties";

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
      images: null,
      privacyIndex: 0,
    };
  }

  componentDidMount() {
    this.animation.play();
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

  handlePressOpenGalery = async () => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
        mediaType: "photo",
      });

      this.setState({
        images,
      });
    } catch (err) {
      this.setState({
        images: null,
      });
    }
  }

  handlePressOpenCamera = async () => {
    try {
      let images = [];
      const data = await ImagePicker.openCamera({});
      images.push(data);

      this.setState({
        images,
      });

    } catch (err) {
      this.setState({
        images: null,
      });
    }
  }

  render() {
    const { profile, handlePressPost, id } = this.props;
    const { text, images, privacyIndex } = this.state;

    const listImage = images ? images.map((item, idx) => <Image key={idx} source={{uri: item.path}} style={{width: "100%", height: 200, marginVertical: 10}}/>) : null;

    return (
      <Layout navigation={this.props.navigation}>
        <View style={styles.container}>

          <View style={styles.headerContainer}>
            <View style={styles.avatar} >
              <HeaderAvatar avatar={profile.picture} id={id}/>
            </View>
            <View style={{flex: 4, justifyContent:"center", alignItems:"center"}}>
              <ModalDropdown
                textStyle={{fontSize: 16}}
                dropdownTextStyle={{fontSize: 16}}
                options={POST_PRIVACY_DISPLAY}
                defaultValue={POST_PRIVACY_DISPLAY[0]}
                onSelect={(index, value)=>this.setState({privacyIndex: index})}/>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={this._handleClose}>
              <Icon type="MaterialIcons" name="close" style={{ fontSize: 30, color: colors.LIGHT_GRAY }} />
            </TouchableOpacity>
          </View>

          <View style={styles.wrapper}>
            <TextInput style={styles.input}
              onChangeText={this._onChangeText}
              multiline={true}
              value={text}
              placeholder={!this.props.message ? "What's happening?" : ""}
              maxLength={MAX_MESSAGE_CHARACTER}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
            <ScrollView style={styles.imageContainer}>
              {listImage}
            </ScrollView>
          </View>

          <View style={styles.bottomContainer}>
            <View style={styles.mediaControlContainer}>
              <TouchableOpacity
                style={styles.mediaButton}
                onPress={this.handlePressOpenGalery}>
                <Icon type="MaterialIcons" name="attachment" style={{ fontSize: 30, color:colors.LIGHT_GRAY }} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.mediaButton, {width: 30, height: 30}]}
                onPress={this.handlePressOpenCamera}>
                <LottieAnimation
                  ref={animation => { this.animation = animation;}}
                  source={LottieAsset.camera}
                />
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, flexDirection:"row", alignItems:"center", justifyContent:"flex-end"}}>
                <Text style={styles.textLength}>{this._textLength}</Text>
                <TouchableOpacity style={styles.postButton} disabled={this._buttonDisabled} onPress={() => handlePressPost(text, images, privacyIndex)}>
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
