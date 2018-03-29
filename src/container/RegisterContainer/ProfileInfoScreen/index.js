import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import { colors } from "../../../constants";
import styles from "../styles";
import { changeRegisterProfile } from "../actions";

const tipContent = "Hint: Chọn tên đăng nhập, mật khẩu dễ nhớ và có độ dài trên 8 ký tự sẽ giúp bảo mật hơn";

@connect(
  null,
  dispatch => ({ dispatch })
)
class ProfileInfoScreen extends Component {
  state = {
    username: undefined,
    password: undefined,
    phone: undefined,
    email: undefined,
    error: null,
  }

  _handlePressBack = () => {
    this.props.dispatch(NavigationActions.back());
  }

  _handlePressNext = async () => {
    const { username, password, phone, email } = this.state;
    if ( !username || !password || !phone || !email){
      this.setState({
        error: "Hãy điền đủ thông tin trước"
      });
      return;
    }
    await this.props.dispatch(changeRegisterProfile({ username, password, phone, email }));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Thông tin tài khoản</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.tipContainer}>
            <Text style={styles.tipText}>{tipContent}</Text>
          </View>
          <Text style={styles.label}>Tên đăng nhập(*):</Text>
          <TextInput
            style={styles.input}
            placeholder="username"
            onChangeText={(value) => this.setState({ username: value, error: null })}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          <Text style={styles.label}>Mật khẩu(*):</Text>
          <TextInput
            password
            style={styles.input}
            placeholder="password"
            onChangeText={(value) => this.setState({ password: value, error: null })}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          <Text style={styles.label}>Email(*):</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="email"
            onChangeText={(value) => this.setState({ email: value, error: null })}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          <Text style={styles.label}>Số điện thoại(*):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="phone number"
            onChangeText={(value) => this.setState({ phone: value, error: null })}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          <Text style={styles.label}>{this.state.error}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.backContainer} onPress={this._handlePressBack}>
            <Text>Quay lại</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextContainer} onPress={this._handlePressNext}>
            <Text style={{ color: colors.WHITE }}>Tiếp theo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ProfileInfoScreen;
