import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import axios from "axios";

import { API_SERVER } from "../../../constants";
import styles from "../styles";

const tipContent = "Hint: Kiểm tra email đăng ký để lấy mã xác nhận, kiểm tra hòm thư spam trong trường hợp không thấy.";

@connect(
  ({registerInfo}) => ({
    username: registerInfo.user.username
  }),
  dispatch => ({ dispatch })
)
class VerificationScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeCode: undefined,
      error: null,
    };
  }

  _handlePressVerify = async () => {
    const data = {
      username: this.props.username,
      activeCode: this.state.activeCode,
    };

    try {
      const activeResult = await axios.post(`${API_SERVER}/auth/active/`, data);
      // handle after successful verifycation
      if ( activeResult.status === 200 ){
        Alert.alert(
          "Tiến trình kích hoạt",
          "Xác nhận email thành công, trở về trang đăng nhập",
          [
            {
              text: "Quay về",
              onPress: () => {
                this.props.dispatch(NavigationActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: "Login" })]
                }));
              }
            }
          ],
          { cancelable: false }
        );
      }
    } catch (e) {
      Alert.alert(
        "Tiến trình kích hoạt",
        "Lỗi kích hoạt, vui lòng thử lại sau!",
        [
          {text: "Thử lại"},
          {
            text: "Quay về",
            onPress: () => {
              this.props.dispatch(NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Login" })]
              }));
            }
          }
        ],
        { cancelable: false }
      );
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Mã xác nhận</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.tipContainer}>
            <Text style={styles.tipText}>{tipContent}</Text>
          </View>
          <View style={{flexDirection: "row", marginTop: 60}}>
            <View style={styles.verifyInputContainer}>
              <TextInput
                autoFocus
                autoCapitalize="none"
                placeholder="Verification Code"
                underlineColorAndroid="rgba(0,0,0,0)"
                style={styles.input}
                onChangeText={(value) => this.setState({ activeCode: value })}
              />
            </View>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center",}}>
              <TouchableOpacity style={styles.verifyButton} onPress={this._handlePressVerify}>
                <Text style={styles.verifyButtonText}>Xác thực</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.label}>{this.state.error}</Text>
        </View>
      </View>
    );
  }
}

export default VerificationScreen;
