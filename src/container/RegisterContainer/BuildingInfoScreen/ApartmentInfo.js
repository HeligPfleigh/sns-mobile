import React, { Component } from "react";
import { Text } from "react-native";
import { Picker, Item } from "native-base";
import { graphql, compose } from "react-apollo";

import styles from "../styles";
import GET_APARTMENT from "../../../graphql/queries/building";

@compose(
  graphql(GET_APARTMENT, {
    name: "getApartments",
    options: (ownProps) => {
      return {
        variables: {
          _id: ownProps._id,
        }
      };
    }
  })
)
class ApartmentInfo extends Component {
  state = {
    apartments: undefined,
  }

  onApartmentsChange = (value) => {
    this.props.onApartmentsChange(value);
    this.setState({apartment: value});
  }

  render(){
    const { getApartments } = this.props;
    if (getApartments.loading) {
      return <Text style={styles.errorText}>Đang tải dữ liệu</Text>;
    }

    const { apartments } = getApartments.building;
    return (
      <Picker
        mode="dropdown"
        placeholder="Chạm để chọn căn hộ của bạn"
        selectedValue={this.state.apartments}
        onValueChange={this.onApartmentsChange}
        >
        {apartments.map(item => <Item label={item.name} value={item._id} key={item._id}/>)}
      </Picker>
    );
  }
}

export default ApartmentInfo;
