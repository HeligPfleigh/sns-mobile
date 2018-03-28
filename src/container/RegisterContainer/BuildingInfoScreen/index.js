import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { NavigationActions } from "react-navigation";
import { Picker, Item } from "native-base";

import { colors } from "../../../constants";
import styles from "../styles";
import GET_BUILDINGS from "../../../graphql/queries/buildings";

const tipContent = "Hint: Chọn toà nhà và căn hộ dựa theo gợi ý";

@compose(
  connect(
    null,
    dispatch => ({ dispatch })
  ),
  graphql(GET_BUILDINGS, {
    name: "getBuildings",
    options: () => ({
      variables: { query: "" },
      fetchPolicy: "network-only"
    }),
  }),
)
class BuildingInfoScreen extends Component {
  _handlePressBack = () => {
    this.props.dispatch(NavigationActions.back());
  }

  _handlePressNext = () => {
    this.props.dispatch(NavigationActions.navigate({
      routeName: "RegisterProfileInfo"
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Thông tin toà nhà bạn đăng ký</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.tipContainer}>
            <Text style={styles.tipText}>{tipContent}</Text>
          </View>
          <Text style={styles.label}>Toà nhà(*):</Text>
          <Picker
              iosHeader="Select one"
              mode="dropdown"
              placeholder="Select One"
            >
              <Item label="Wallet" value="key0" />
              <Item label="ATM Card" value="key1" />
              <Item label="Debit Card" value="key2" />
              <Item label="Credit Card" value="key3" />
              <Item label="Net Banking" value="key4" />
          </Picker>
          <Text style={styles.label}>Căn hộ(*):</Text>
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
