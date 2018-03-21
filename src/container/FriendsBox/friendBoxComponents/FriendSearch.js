import React, { Component } from "react";
import Data from "./Data";
import DataSuggest from "./DataSuggest";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native";
import {
  Container,
  Header,
  Title,
  View,
  Content,
  Text,
  Button,
  Footer,
  Left,
  Right,
  Body,
  Item,
  List,
  ListItem,
  Tab,
  FooterTab,
  TabHeading,
  Thumbnail,
  Input
} from "native-base";

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

            <ScrollView>
              <Data text={this.state.text} />

              <Text style={{ paddingTop: 20, paddingBottom: 20, fontWeight: "bold" }}>Những người bạn có thể biết</Text>
              <DataSuggest />
            </ScrollView>
          </View>
        </Content>
      </Container>
    );
  }
}

export default FriendSearch;
