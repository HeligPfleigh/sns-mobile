import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { Card } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { colors, fakeAvatar } from "../constants";

const AVATAR_SIZE = 30;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
    minHeight: 50,
    width: "100%",
  },
  avatarContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    paddingLeft: 15,
  },
  avatar:{
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    borderRadius: AVATAR_RADIUS,
  },
  textContainer: {
    flex: 4,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.LIGHT_GRAY,
  },
  cameraContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
});

const FeedsHeader = ({ info }) => {
  const text = `What's new with you, ${info.username}? `;
  return (
    <Card style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{ uri: fakeAvatar }}/>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.cameraContainer}>
        <MaterialCommunityIcons name="pencil" size={20} color={colors.LIGHT_GRAY} />
      </View>
    </Card>
  );
};

export default FeedsHeader;
