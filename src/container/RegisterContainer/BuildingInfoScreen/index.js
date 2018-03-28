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
  constructor(props){
    super(props);
    this.state = {
      buildings: undefined,
      apartment: [],
    };
  }

  _handlePressBack = () => {
    this.props.dispatch(NavigationActions.back());
  }

  _handlePressNext = () => {
    this.props.dispatch(NavigationActions.navigate({
      routeName: "RegisterProfileInfo"
    }));
  }

  onBuildingChange = (value) => this.setState({buildings: value})

  render() {
    const { getBuildings } = this.props;

    let buildingsInfo, apartmentInfo;
    if ( !getBuildings.loading ){
      buildingsInfo = <Picker
        iosHeader="Chọn toà nhà"
        mode="dropdown"
        placeholder="Chạm để chọn toà nhà bạn đang ở"
        selectedValue={this.state.buildings}
        onValueChange={this.onBuildingChange}
      >
        {getBuildings.buildings.map(item => <Item key={item._id} label={item.name} value={item._id}/>)}
      </Picker>;
    }
    else {
      buildingsInfo = <Text style={styles.errorText}>Đang tải thông tin từ server</Text>;
    }

    apartmentInfo = <Text style={styles.errorText}>Chọn thông tin toà nhà trước</Text>;

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
          { buildingsInfo }
          <Text style={styles.label}>Căn hộ(*):</Text>
          { apartmentInfo }
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
