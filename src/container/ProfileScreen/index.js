import React, { Component } from "react";
import { Content, Text } from "native-base";
import { View, Image } from "react-native";
import Layout from "../../components/Layout";
import styles from "./styles";
import { connect } from "react-redux";
import { fakeAvatar } from "../../constants";

@connect(
  ({ userInfo }) => ({
    fullName: userInfo.fullName,
    avatarUri: userInfo && userInfo.profile && userInfo.profile.picture,
    email: userInfo.email && userInfo.email.address,
    username: userInfo.username
  }),
  null
)
class ProfileContainer extends Component {
  render() {
    const { avatarUri, fullName, email,username } = this.props;
    const UserInfo = [
      {
        title: "Họ và tên: ",
        value: fullName
      },
      {
        title: "Email: ",
        value: email
      },
      {
        title: "username: ",
        value: username
      }
    ];
    return (
      <Layout navigation={this.props.navigation}>
        <Content padder style={{ backgroundColor: "#fff" }}>
          <View style={styles.header}>
            <Text style={{ textAlign: "center", fontSize: 20 }}>{"Thông tin cá nhân"}</Text>
            <Image source={{ uri: avatarUri || fakeAvatar }} style={styles.avatar} />
          </View>
          {UserInfo.map((e, i) => {
            return (
              <View style={styles.infoTextContainer} key={i}>
                <Text style={styles.infoText}>{e.title}</Text>
                <Text style={styles.infoText}>{e.value || "Chưa cập nhật"}</Text>
              </View>
            );
          })}
        </Content>
      </Layout>
    );
  }
}

export default ProfileContainer;
