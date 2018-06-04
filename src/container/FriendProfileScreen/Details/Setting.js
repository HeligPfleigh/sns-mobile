import React, { Component } from "react";
import { Text, Icon, Button, Card, CardItem } from "native-base";
import { View, Modal } from "react-native";
import { connect } from "react-redux";
import SettingOptions from "./SettingOptions";
import { NavigationActions } from "react-navigation";

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
  passwordChange() {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "ChangePasswordScreen"
      })
    );
  }
  render() {
    const close = () => {
      this.setModalVisible(!this.state.modalVisible);
    };
    const { info } = this.props;
    const { userInfo } = this.props;
    if (info.username === userInfo.username) {
      return (
        <Card style={{ margin: 10 }}>
          <CardItem style={{flexDirection:"column"}}>
            <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}>
              <View style={{ marginTop: 22 }}>
                <View>
                  <Button
                    transparent
                    info
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <Icon name="ios-backspace-outline" />
                  </Button>

                  <SettingOptions close={close} />
                </View>
              </View>
            </Modal>
            <Button iconLeft light onPress={this.edit.bind(this)}>
              <Icon name="ios-construct-outline" />
              <Text>Cập nhật thông tin</Text>
            </Button>
            <Button iconLeft light onPress={this.passwordChange.bind(this)} style={{ marginTop: 10 }}>
              <Icon name="ios-build-outline" />
              <Text> Đổi mật khẩu </Text>
            </Button>
          </CardItem>
        </Card>
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
