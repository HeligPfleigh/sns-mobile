import React, { Component } from "react";
import {
  View,
  Text,
  Icon,
  Tab,
  Tabs,
  TabHeading,
  Button
} from "native-base";
import { FlatList, Image, Dimensions } from "react-native";
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

          <View style={{flexDirection: "row", marginTop: 20}}>
            <Button info bordered  style={{width:Dimensions.get("window").width / 3,margin:5}}><Text style={{textAlign: "center"}}> Kết bạn</Text></Button>
            <Button danger bordered  style={{width:Dimensions.get("window").width / 3,margin:5}}><Text> Theo dõi</Text></Button>
            <Button success bordered  style={{width:Dimensions.get("window").width / 3,margin:5}}><Text> Nhắn tin</Text></Button>
          </View>
          <Tabs style={{paddingTop:5}}>
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
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-people-outline" />
                  <Text style={{fontWeight:"bold"}}>Khác</Text>
                </TabHeading>
              }
             />
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
