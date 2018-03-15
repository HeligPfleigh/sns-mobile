import React from "react";
import { CardItem, Text } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { colors } from "../../constants";

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: "row",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 32,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.LIGHT_GRAY,
  }
});

const ICON_SIZE = 20;

const FeedCardBottom = ({ isLiked, totalComments, totalLikes }) => (
  <CardItem style={styles.container}>
    <TouchableOpacity style={styles.button}>
      <MaterialCommunityIcons name="thumb-up-outline" size={ICON_SIZE} color={isLiked ? colors.PRIMARY : colors.LIGHT_GRAY}/>
      <Text style={styles.buttonText}> {totalLikes} </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button}>
      <MaterialCommunityIcons name="comment-processing-outline" size={ICON_SIZE} color={colors.LIGHT_GRAY}/>
      <Text style={styles.buttonText}> {totalComments} </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button}>
      <MaterialCommunityIcons name="share" size={ICON_SIZE} color={colors.LIGHT_GRAY}/>
    </TouchableOpacity>
  </CardItem>
);

export default FeedCardBottom;
