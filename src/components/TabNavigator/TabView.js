import React from "react";
import { View } from "react-native";

import TabBar from "./TabBar";

export default ({ descriptors, navigation }) => {
  const { routes, index } = navigation.state;
  const descriptor = descriptors[routes[index].key];
  const ActiveScreen = descriptor.getComponent();
  return (
    <View style={{ flex: 1 }}>
      <TabBar navigation={navigation} />
      <ActiveScreen navigation={descriptor.navigation} />
    </View>
  );
};
