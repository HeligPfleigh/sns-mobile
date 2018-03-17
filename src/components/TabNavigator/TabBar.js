import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Footer, FooterTab, Button, Icon, Badge, Text } from "native-base";

var styles = StyleSheet.create({
  tabs: {
    borderStyle: "solid",
    borderTopWidth: 0.5,
    borderTopColor: "gray",
    backgroundColor: "transparent"
  }
});

class TabBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation, navigationState, renderIcon, badge = 0 } = this.props;
    return (
      <Footer style={styles.tabs}>
        <FooterTab>
          {navigationState.routes.map(route => {
            return (
              <Button
                vertical
                badge={badge > 0}
                key={route.key}
                onPress={() => {
                  navigation.navigate(route.routeName);
                }}
              >
                {badge > 1 && (
                  <Badge>
                    <Text>{badge}</Text>
                  </Badge>
                )}
                {renderIcon({ route })}
              </Button>
            );
          })}
          <Button vertical onPress={() => navigation.navigate("DrawerOpen")}>
            <Icon name="md-menu" style={{ fontSize: 29 }} />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default TabBar;
