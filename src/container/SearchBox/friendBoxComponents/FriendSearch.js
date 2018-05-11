import React, { Component } from "react";
import Data from "./Data";
import { ScrollView } from "react-native";
import { Container, View, Content, Item, Input } from "native-base";

class FriendSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      bool: false
    };
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ flex: 1 }}>
            <View>
              <Item  underline style={{ marginTop: 1 }}>
                <Input
                  placeholder="Tên, email , ..."
                  onChangeText={text => {
                    this.setState({ text });
                  }}
                  value={this.state.text}
                />
              </Item>
            </View>

            <ScrollView>
              <Data text={this.state.text} />
            </ScrollView>
          </View>
        </Content>
      </Container>
    );
  }
}

export default FriendSearch;
