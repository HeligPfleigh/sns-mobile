import React, { Component } from "react";
import { Text, Body, Card, CardItem, Icon } from "native-base";
import { View } from "react-native";

class Intro extends Component {
  render() {
    return (
      <Card>
        <CardItem>
          <Body>
            <View style={{ margin: 10 }}>
              <Text>
                <Icon name="ios-male" style={{ fontSize: 13, lineHeight: 35, paddingRight: 15 }} />
                <Text> Giới tính: </Text>
                {this.props.info.profile.gender === "female" ? "nữ" : "nam"}
              </Text>
              <Text>
                <Icon name="ios-calendar-outline" style={{ fontSize: 13, lineHeight: 35, paddingRight: 15 }} />
                <Text>Sinh nhật: </Text>
                {this.props.info.profile.dob === null ? "chưa cung cấp" : this.props.info.profile.dob}{" "}
              </Text>
              <Text>
                <Icon name="ios-podium-outline" style={{ fontSize: 13, lineHeight: 35, paddingRight: 15 }} />
                <Text>Toà nhà: </Text> {this.props.info.building.name}{" "}
              </Text>
              <Text>
                <Icon name="ios-call" style={{ fontSize: 13, lineHeight: 35, paddingRight: 15 }} />
                <Text>Số điện thoại: </Text>
                {this.props.info.phone === null ? "chưa cung cấp" : this.props.info.phone.number}
              </Text>
            </View>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

export default Intro;
