import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import styles from "../styles";

const tipContent = "Hint: Kiểm tra email đăng ký để lấy mã xác nhận, kiểm tra hòm thư spam trong trường hợp không thấy.";

@connect(
  null,
  dispatch => ({ dispatch })
)
class VerificationScreen extends Component {
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
              />
            </View>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center",}}>
              <TouchableOpacity style={styles.verifyButton}>
                <Text style={styles.verifyButtonText}>Xác thực</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.footer} />
      </View>
    );
  }
}

export default VerificationScreen;
