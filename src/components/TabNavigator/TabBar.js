import React, { Component } from "react";
import { Footer, FooterTab } from "native-base";

import { FTButton } from "../FooterTab";

class TabBar extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Footer>
        <FooterTab>
          {navigation.state.routes.map(route => (
            <FTButton
              name="home"
              key={route.routeName}
              iconStyle={{ fontSize: 26 }}
              onPress={() => navigation.navigate(route.routeName)}
            />
          ))}
        </FooterTab>
      </Footer>
    );
  }
}

export default TabBar;
