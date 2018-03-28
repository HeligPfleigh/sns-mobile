import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import { colors } from "../../../constants";
import styles from "../styles";

const tipContent = "Hint: Chọn tên đăng nhập, mật khẩu dễ nhớ và có độ dài trên 8 ký tự sẽ giúp bảo mật hơn";

@connect(
  null,
  dispatch => ({ dispatch })
)
class BuildingInfoScreen extends Component {
  _handlePressBack = () => {
    this.props.dispatch(NavigationActions.back());
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
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          <Text style={styles.label}>Mật khẩu(*):</Text>
          <TextInput
            style={styles.input}
            placeholder="password"
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          <Text style={styles.label}>Email(*):</Text>
          <TextInput
            style={styles.input}
            placeholder="email"
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          <Text style={styles.label}>Số điện thoại(*):</Text>
          <TextInput
            style={styles.input}
            placeholder="phone number"
            underlineColorAndroid="rgba(0,0,0,0)"
          />
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

export default BuildingInfoScreen;
