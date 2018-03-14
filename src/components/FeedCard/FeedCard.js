import React from "react";
import { Image } from "react-native";
import { Card, CardItem } from "native-base";

import FeedCradHeader from "./FeedCardHeader";
import FeedCardBottom from "./FeedCardBottom";

const FeedCard = () => (
  <Card>
    <FeedCradHeader />
    <CardItem cardBody>
      <Image
        source={{ uri: "https://randomuser.me/api/portraits/women/25.jpg" }}
        style={{ height: 200, width: null, flex: 1 }}
      />
    </CardItem>
    <FeedCardBottom />
  </Card>
);

export default FeedCard;
