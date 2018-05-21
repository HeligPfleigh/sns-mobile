import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, Animated, Easing, Modal } from "react-native";
import { Card, Button, Icon, View, Right, Left, Body, Header } from "native-base";
import { connect } from "react-redux";
import LottieAnimation from "lottie-react-native";
import EventSelections from "./EventSelections";
import LottieAsset from "../../assets/lotties";
import { POST_PRIVACY_DISPLAY } from "../../constants";
import ModalDropdown from "react-native-modal-dropdown";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    minHeight: 50
  }
});

@connect(null, dispatch => ({ dispatch }))
class ListEventsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
      modalVisible: false,
      privacyIndex: 0
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear
    }).start();
  }

  render() {

  const close = () => {
    this.setModalVisible(!this.state.modalVisible);
  };

    return (
      <Card>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Header>
                <Left>
                  <Button
                    transparent
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <Icon name="ios-backspace-outline" />
                  </Button>
                </Left>
                <Body>
                  <ModalDropdown
                    textStyle={{ fontSize: 16 }}
                    dropdownTextStyle={{ fontSize: 16 }}
                    options={POST_PRIVACY_DISPLAY}
                    defaultValue={POST_PRIVACY_DISPLAY[0]}
                    onSelect={(index, value) => this.setState({ privacyIndex: index })}
                  />
                </Body>
                <Right />
              </Header>
              <EventSelections privacyIndex={this.state.privacyIndex} close={close} />
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.container}>
          <LottieAnimation progress={this.state.progress} source={LottieAsset.confetti} />
          <View style={{ alignItems: "flex-end" }}>
            <Button
              bordered
              iconLeft
              small
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Icon type="MaterialCommunityIcons" name="plus" />
              <Text style={{ marginHorizontal: 10 }}>Tạo sự kiện</Text>
            </Button>
          </View>
        </TouchableOpacity>
      </Card>
    );
  }
}

export default ListEventsHeader;
