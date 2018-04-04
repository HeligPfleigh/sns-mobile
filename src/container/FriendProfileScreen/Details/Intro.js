import React, { Component } from "react";
import { Text,  Body, Card, CardItem, Icon } from "native-base";
import {  View } from "react-native";

class Intro extends Component {
  render() {
    return (
      <Card>
        <CardItem>
          <Body>
            <View style={{ marginTop: 10 }}>
              <Text>
                <Icon name="ios-photos-outline" style={{ fontSize: 13 }} /> Giới tính:{" "}
                {this.props.info.profile.gender === "female" ? "nữ" : "nam"}{" "}
              </Text>
              <Text>
                <Icon name="ios-photos-outline" style={{ fontSize: 13 }} /> Sinh nhật:{" "}
                {this.props.info.profile.dob === null ? "chưa cung cấp" : this.props.info.profile.dob}{" "}
              </Text>
              <Text>
                <Icon name="ios-photos-outline" style={{ fontSize: 13 }} /> Toà nhà: {this.props.info.building.name}{" "}
              </Text>
              <Text>
                <Icon name="ios-photos-outline" style={{ fontSize: 13 }} /> Số điện thoại:{" "}
                {this.props.info.phone === null ? "chưa cung cấp" : this.props.info.phone.number}{" "}
              </Text>
            </View>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

export default Intro;
