import React, { Component } from "react";
import {
  View,
  Text,
  Icon,
  Tab,
  Tabs,
  TabHeading
} from "native-base";
import { FlatList, Image } from "react-native";
import Layout from "../../../components/Layout";
import FeedCard from "../../../components/FeedCard/FeedCard";
import styles from "../styles";
import Intro from "./Intro";
import Friends from "./Friends";

class Wall extends Component {
  end() {
  }
  _renderItem = ({ item }) => <FeedCard {...item} />
  _disableScroll() {
    this._list.getScrollResponder().setNativeProps({
      scrollEnabled: false
    });
  }
  renderHeader = () => {
    const info = this.props.info;
    return (
      <View>
        <View style={styles.header}>
          <Image source={{ uri: this.props.info.profile.picture }} style={styles.avatar} />
          <Text style={{ textAlign: "center", fontSize: 25 }}>{this.props.info.username}</Text>


          <Tabs style={{paddingTop:10}}>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="person-add" />
                  <Text style={{fontWeight:"bold"}}>Giới thiệu</Text>
                </TabHeading>
              }
            >
              <Intro info={info}/>
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-people-outline" />
                  <Text style={{fontWeight:"bold"}}>Bạn bè</Text>
                </TabHeading>
              }
            >
              <Friends info={info}/>
            </Tab>
          </Tabs>
        </View>
      </View>
    );
  }

  render() {
    var content = (
      <FlatList
        keyExtractor={index => index._id}
        contentContainerStyle={{ alignSelf: "stretch" }}
        onEndReached={this.end.bind(this)}
        onEndReachedThreshold={0.1}
        data={this.props.info.posts}
        renderItem={this._renderItem.bind(this)}
        ListHeaderComponent={this.renderHeader}
      />
    );

    return (
      <Layout>
        <View>{content}</View>
      </Layout>
    );
  }
}

export default Wall;
