import React from "react";
import { StyleSheet, View, Text } from "react-native";
import distanceInWordToNow from "date-fns/distance_in_words_to_now";

import HeaderAvatar from "../HeaderAvatar";
import { colors } from "../../constants";

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  avatarContainer: {
    flex: 0.2,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 5,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    margin: 5,
    borderRadius: 25,
    backgroundColor: "#e4e4e4",
  },
  contentContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  metaContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 20,
  },
  nameText: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "500",
  },
  timeText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.SECONDARY,
  },
  commentText: {
    color: colors.SECONDARY,
  }
});

const FeedComments = ({avatar, name, comment, createdAt}) => {
  const shortComment = comment.length > 40 ? `${comment.substring(0,40)}...` : comment;
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <HeaderAvatar avatar={avatar}/>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.metaContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.timeText}>{ distanceInWordToNow(createdAt) } ago</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.commentText}>{shortComment}</Text>
        </View>
      </View>
    </View>
  );
};

export default FeedComments;
