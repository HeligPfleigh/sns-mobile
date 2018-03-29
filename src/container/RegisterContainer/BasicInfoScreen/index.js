import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import { colors } from "../../../constants";
import { changeRegisterName } from "../actions";
import styles from "../styles";

const tipContent = "Hint: Đăng ký với tên thật giúp bạn bè dễ tìm kiếm hơn, cũng như nhận được thông tin chính xác từ ban quản trị";

@connect(
  ({ registerInfo }) => ({
    profile: registerInfo.user.profile,
  }),
  dispatch => ({ dispatch })
)
class BasicInfoScreen extends Component {
  state = {
    firstName: this.props.profile.firstName,
    lastName: this.props.profile.lastName,
  }

  _handlePressBack = () => {
    this.props.dispatch(NavigationActions.back());
  }

  _handlePressNext = async () => {
    const { firstName, lastName } = this.state;
    if ( firstName && lastName){
      await this.props.dispatch(changeRegisterName({firstName, lastName}));

      this.props.dispatch(NavigationActions.navigate({
        routeName: "RegisterBuildingInfo"
      }));
    }
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
            value={this.state.firstName}
            placeholder="First Name"
            onChangeText={(value) => this.setState({ firstName: value })}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          <Text style={styles.label}>Họ (*):</Text>
          <TextInput
            style={styles.input}
            value={this.state.lastName}
            placeholder="Last Name"
            onChangeText={(value) => this.setState({ lastName: value })}
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
