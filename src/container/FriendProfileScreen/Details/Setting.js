import React, { Component } from "react";
import { Text, Icon, Button } from "native-base";
import { View, Modal } from "react-native";
import { connect } from "react-redux";
import SettingOptions from "./SettingOptions";

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  edit() {
    this.setModalVisible(true);
  }
  render() {
    const close = () => {
      this.setModalVisible(!this.state.modalVisible);
    };
    const { info } = this.props;
    const { userInfo } = this.props;
    if (info.username === userInfo.username) {
      return (
        <View style={{ margin: 10 }}>
          <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}>
            <View style={{ marginTop: 22 }}>
              <View>
                <Button
                  transparent
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Icon name="ios-backspace-outline" />
                </Button>

                <SettingOptions close={close}/>
              </View>
            </View>
          </Modal>
          <Button iconLeft light onPress={this.edit.bind(this)}>
            <Icon name="ios-construct-outline" />
            <Text>Cập nhật thông tin</Text>
          </Button>
        </View>
      );
    } else {
      return null;
    }
  }
}

const SettingWithData = connect(
  ({ userInfo }) => ({ userInfo }),
  dispatch => ({
    dispatch
  })
)(Setting);
export default SettingWithData;
