import React, { Component } from "react";
import { Platform } from "react-native";
import { connect } from "react-redux";
import { Container, Header, Content, View, Footer, FooterTab } from "native-base";

import { FTButton } from "../../components/FooterTab";
import { graphql, compose } from "react-apollo";
import { ActivityIndicator, FlatList } from "react-native";

import GET_FEEDS_QUERY from "../../graphql/queries/feeds";
import ME_QUERY from "../../graphql/queries/me";
import FeedCard from "../../components/FeedCard/FeedCard";
import FeedsHeader from "../../components/FeedsHeader";
import styles from "./styles";

@compose(
  connect(({ common }) => ({
    orientation: common.orientation
  })),
  graphql(GET_FEEDS_QUERY, {
    name: "getFeeds",
    options: () => ({
      variables: { limit: 10 },
      fetchPolicy: "network-only",
    }),
  }),
  graphql(ME_QUERY, { name: "getMe"}),
)
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    props.navigation.navigate("DrawerClose");
  }
  _renderItem = ({ item }) => <FeedCard {...item} />

  _renderFeedHeader = () => {
    const { getMe } = this.props;
    return <FeedsHeader info={getMe.me}/>;
  }

  render() {
    const { getMe, getFeeds } = this.props;

    let content;
    if ( getFeeds.loading || getMe.loading ){
      content = <ActivityIndicator size="large" />;
    } else {
      content =
        <FlatList
          contentContainerStyle={{ alignSelf: "stretch" }}
          data={getFeeds.feeds.edges}
          ListHeaderComponent={this._renderFeedHeader}
          keyExtractor={(item) => item._id}
          renderItem={this._renderItem}
        />;
    }

    return (
      <Container>
        {Platform.OS === "ios" && <Header style={{ height: 22 }} />}
        <Content>
          <View style={styles.root}>
            {content}
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <FTButton active text="Trang chủ" name="home" iconStyle={{ fontSize: 23 }} />
            <FTButton text="Tin nhắn" name="chatbubbles" iconStyle={{ fontSize: 23 }} />
            <FTButton text="Kết bạn" name="contacts" iconStyle={{ fontSize: 23 }} />
            <FTButton text="Thông báo" name="notifications" iconStyle={{ fontSize: 23 }} />
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}


export default (HomeScreen);
