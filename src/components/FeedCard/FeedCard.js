import React from "react";
import { Text, StyleSheet } from "react-native";
import { Card, CardItem } from "native-base";

import { colors } from "../../constants";
import FeedCardHeader from "./FeedCardHeader";
import FeedCardBottom from "./FeedCardBottom";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    minHeight: 180,
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
  textContent: {
    fontSize: 14,
    textAlign: "left",
    fontWeight: "500",
    color: colors.SECONDARY,
  }
});

const FeedCard = ({message, author, isLiked, totalComments, totalLikes, createdAt}) => {
  const text = JSON.parse(message).blocks[0].text;
  return (
    <Card style={styles.container}>
      <FeedCardHeader {...author} createdAt={createdAt}/>
      <CardItem cardBody style={styles.contentContainer}>
        <Text style={styles.textContent}>
          {text}
        </Text>
      </CardItem>
      <FeedCardBottom isLiked={isLiked} totalComments={totalComments} totalLikes={totalLikes}/>
    </Card>
  );
};

export default FeedCard;
