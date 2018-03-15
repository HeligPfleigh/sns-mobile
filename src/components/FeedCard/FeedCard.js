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

const text = "Some feed content should appear here asljkakjs alksdjlfka alksjdf";

const FeedCard = () => (
  <Card style={styles.container}>
    <FeedCardHeader />
    <CardItem cardBody style={styles.contentContainer}>
      <Text style={styles.textContent}>
        {text}
      </Text>
    </CardItem>
    <FeedCardBottom />
  </Card>
);

export default FeedCard;
