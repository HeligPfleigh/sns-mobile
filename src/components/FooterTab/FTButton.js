import React from "react";
import { Platform } from "react-native";
import { Button, Icon, Text, Badge } from "native-base";

export default ({ text, name, active = false, badge = 0, iconStyle = {}, onPress }) => (
  <Button active={ Platform.OS !== "ios" && active} badge={badge > 1} vertical onPress={onPress}>
    {badge > 1 && (
      <Badge>
        <Text>{badge}</Text>
      </Badge>
    )}
    {name && <Icon active={active} name={name} style={iconStyle} />}
    {Platform.OS !== "ios" && text && <Text>{text}</Text>}
  </Button>
);
