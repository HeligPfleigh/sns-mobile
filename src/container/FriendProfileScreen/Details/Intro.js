import React, { Component } from "react";
import { Text, Card, CardItem, Icon } from "native-base";

class Intro extends Component {
  render() {
    return (
      <Card>
        <CardItem>
          <Icon small name="ios-male" />
          <Text> Giới tính: {this.props.info.profile.gender === "female" ? "nữ" : "nam"}</Text>
        </CardItem>

        <CardItem>
          <Icon small name="ios-calendar-outline" />
          <Text>
            Sinh nhật:{" "}
            {this.props.info.profile.dob === null
              ? "chưa cung cấp"
              : this.props.info.profile.dob.toString().split("T")[0]}
          </Text>
        </CardItem>

        <CardItem>
          <Icon small name="ios-podium-outline" />
          <Text>Toà nhà: {this.props.info.building.name}</Text>
        </CardItem>
        <CardItem>
          <Icon small name="ios-call" />
          <Text>Số điện thoại: {this.props.info.phone === null ? "chưa cung cấp" : this.props.info.phone.number}</Text>
        </CardItem>
        <CardItem />
      </Card>
    );
  }
}

export default Intro;
