import React, { Component } from "react";
import Data from "./Data";

import { Container, View, Content, Item, Input } from "native-base";

class FriendSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  search() {
    // console.log(this.state.text);
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ flex: 1 }}>
            <View>
              <Item regular style={{ marginTop: 1 }}>
                <Input
                  placeholder="Tên, email , ..."
                  onChangeText={text => {
                    this.setState({ text });
                  }}
                  value={this.state.text}
                />
              </Item>
            </View>

            <Container>
              <Data text={this.state.text} />
            </Container>
          </View>
        </Content>
      </Container>
    );
  }
}

export default FriendSearch;
