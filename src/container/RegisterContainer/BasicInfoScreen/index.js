import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import { colors } from "../../../constants";
import styles from "../styles";

const tipContent = "Hint: Đăng ký với tên thật giúp bạn bè dễ tìm kiếm hơn, cũng như nhận được thông tin chính xác từ ban quản trị";

@connect(
  null,
  dispatch => ({ dispatch })
)
class BasicInfoScreen extends Component {
  _handlePressBack = () => {
    this.props.dispatch(NavigationActions.back());
  }

  _handlePressNext = () => {
    this.props.dispatch(NavigationActions.navigate({
      routeName: "RegisterBuildingInfo"
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Tạo tài khoản SNS mới</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.tipContainer}>
            <Text style={styles.tipText}>{tipContent}</Text>
          </View>
          <Text style={styles.label}>Tên (*):</Text>
          <TextInput
            style={styles.input}
            placeholder="First name"
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          <Text style={styles.label}>Họ (*):</Text>
          <TextInput
            style={styles.input}
            placeholder="Last name"
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

export default BasicInfoScreen;
