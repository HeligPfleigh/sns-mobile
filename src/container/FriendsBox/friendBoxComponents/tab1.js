import React, { Component } from "react"
import { graphql } from "react-apollo"
import { gql } from "apollo-boost"
import Data from "./Data"

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
} from "native-base"

import Icon from "react-native-vector-icons/FontAwesome"
import { ScrollView } from "react-native"
const value = ""

class Tab1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: value
    }
  }

  search() {
    console.log(this.state.text)
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ flex: 1 }}>
            <View>
              <Item regular style={{marginTop:1}}>
                <Input
                  placeholder="Tên, email , ..."
                  onChangeText={text => {
                    this.setState({ text })
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
    )
  }
}

export default Tab1
