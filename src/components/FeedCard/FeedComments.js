import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import distanceInWordToNow from "date-fns/distance_in_words_to_now";
import { fakeAvatar, colors } from "../../constants";

const AVATAR_SIZE = 30;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

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
  },
  contentContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    paddingHorizontal: 5,
  },
  metaContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 20,
  },
  image: {
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    borderRadius: AVATAR_RADIUS,
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
  }
});

const FeedComments = ({avatar, name, comment, createdAt}) => {
  const shortComment = comment.length > 50 ? `${comment.substring(0,50)}...` : comment;
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image style={styles.image} source={{uri: avatar || fakeAvatar}} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.metaContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.timeText}>{ distanceInWordToNow(createdAt) } ago</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text>{shortComment}</Text>
        </View>
      </View>
    </View>
  );
};

export default FeedComments;
