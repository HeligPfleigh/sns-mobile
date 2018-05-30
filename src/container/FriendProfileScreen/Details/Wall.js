import React, { Component } from "react";
import { Body, Header, Tab, TabHeading, Tabs, Title, Icon, Button } from "native-base";
import { Platform, Text, FlatList, TouchableOpacity, Animated, ScrollView, View } from "react-native";
import FeedCard from "../../../components/FeedCard/FeedCard";
import styles from "../styles";
import Intro from "./Intro";
import Friends from "./Friends";
import ImagePicker from "react-native-image-crop-picker";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import ChangeAvatar from "../../../graphql/mutations/changeAvatar";
import ChangeBanner from "../../../graphql/mutations/changeBanner";
import { fakeBanner } from "../../../constants";
import { fakeAvatar } from "../../../constants";
import ME_QUERY from "../../../graphql/queries/me";
import Options from "./Options";
import GET_FEEDS_QUERY from "../../../graphql/queries/feeds";
import axios from "axios";
import { Alert } from "react-native";
import { MEDIA_SERVER } from "../../../constants";
import Setting from "./Setting";

const IMAGE_HEIGHT = 250;
const HEADER_HEIGHT = Platform.OS === "ios" ? 64 : 50;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;
const THEME_COLOR = "rgba(85,186,255, 1)";
const FADED_THEME_COLOR = "rgba(85,186,255, 0.8)";

class Wall extends Component {
  constructor(props) {
    super(props);
    this.nScroll.addListener(Animated.event([{ value: this.scroll }], { useNativeDriver: false }));
    this.state = {
      images: null,
      imagesBackground: null,
      scrollY: new Animated.Value(0)
    };
  }
  nScroll = new Animated.Value(0)
  scroll = new Animated.Value(0)
  textColor = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT / 5 + 70, SCROLL_HEIGHT],
    outputRange: ["rgba(0, 0, 0, 0)", FADED_THEME_COLOR, "white"],
    extrapolate: "clamp"
  })
  textBigColor = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT / 5 + 70, SCROLL_HEIGHT],
    outputRange: [THEME_COLOR, FADED_THEME_COLOR, "transparent"],
    extrapolate: "clamp"
  })
  tabBg = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: ["white", THEME_COLOR],
    extrapolate: "clamp"
  })
  tabY = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: [0, 0, 1]
  })
  headerBg = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: ["transparent", FADED_THEME_COLOR, THEME_COLOR],
    extrapolate: "clamp"
  })
  imgScale = this.nScroll.interpolate({
    inputRange: [-25, 0],
    outputRange: [1.1, 1],
    extrapolateRight: "clamp"
  })
  imgOpacity = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: [1, 0]
  })

  clickBackground = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
      mediaType: "photo"
    })

      .then(async res => {
        this.setState({
          imagesBackground: res
        });

        let photo = [];
        if (this.state.imagesBackground) {
          const body = new FormData();
          const url = `${MEDIA_SERVER}/api/upload`;
          this.state.imagesBackground.forEach(image => {
            let filename = image.path.replace(/^.*[\\\/]/, "");
            let file = {
              uri: image.path,
              name: filename,
              type: image.mime
            };
            body.append("files", file);
          });
          try {
            const response = await axios.post(url, body);
            // store all information get from media server
            photo = await response.data.map(item => item.URL);
          } catch (err) {
            throw err;
          }
        }

        this.props.bannerChanger({
          variables: { banner: photo },
          refetchQueries: [
            {
              query: ME_QUERY
            }
          ]
        });
      })

      .catch(err => {
        this.setState({
          images: null
        });
        throw err;
      });
  }

  clickAvatar() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
      mediaType: "photo"
    })

      .then(async res => {
        this.setState({
          images: res
        });

        let photoAvatar = [];
        if (this.state.images) {
          const body = new FormData();
          const url = `${MEDIA_SERVER}/api/upload`;
          this.state.images.forEach(image => {
            let filename = image.path.replace(/^.*[\\\/]/, "");
            let file = {
              uri: image.path,
              name: filename,
              type: image.mime
            };
            body.append("files", file);
          });
          try {
            const response = await axios.post(url, body);
            // store all information get from media server
            photoAvatar = await response.data.map(item => item.URL);
          } catch (err) {
            throw err;
          }
        }

        this.props.avatarChanger({
          variables: { picture: photoAvatar },
          refetchQueries: [
            {
              query: ME_QUERY
            }
          ]
        });
      })
      .catch(err => {
        this.setState({
          images: null
        });
        throw err;
      });
  }

  _renderItem = ({ item }) => <FeedCard {...item} stuff={this.props} />

  renderHeader = () => {
    const info = this.props.info;
    const data = this.props.data;

    return (
      <View>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", paddingTop: 20, paddingBottom: 20 }}>
            <Animated.Text style={{ color: this.textBigColor, textAlign: "center", fontSize: 30 }}>
              {this.props.info.username}
            </Animated.Text>
          </View>

          {this.props.info.username === this.props.userInfo.username ? <View /> : <Options info={info} data={data} />}

          <Tabs style={{ paddingTop: 5 }}>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-person-outline" />
                  <Text style={{ fontWeight: "400", paddingLeft: 5, color: THEME_COLOR }}>Giới thiệu</Text>
                </TabHeading>
              }
            >
              <Intro info={info} />
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-people-outline" />
                  <Text style={{ fontWeight: "400", paddingLeft: 5, color: THEME_COLOR }}>Bạn bè</Text>
                </TabHeading>
              }
            >
              <Friends info={info} />
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-more" />
                  <Text style={{ fontWeight: "400", paddingLeft: 5, color: THEME_COLOR }}>Khác</Text>
                </TabHeading>
              }
            >
              <Setting info={info}/>
            </Tab>
          </Tabs>
        </View>
      </View>
    );
  }

  render() {
    const info = this.props.info;
    const { images, imagesBackground } = this.state;
    var content = (
      <FlatList
        keyExtractor={index => index._id}
        contentContainerStyle={{ alignSelf: "stretch" }}
        data={this.props.info.posts}
        renderItem={this._renderItem.bind(this)}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={() => <View style={{ height: 200 }} />}
      />
    );



    return (
      <View>
        <Animated.View style={{ position: "absolute", width: "100%", backgroundColor: this.headerBg, zIndex: 1 }}>
          <Header style={{ backgroundColor: "transparent", justifyContent: "center" }} hasTabs>
            <Body>
              <Button
                transparent
                style={{ position: "absolute", top: -10, left: 10, zIndex: 1000 }}
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon name="ios-arrow-back" style={{ color: "white" }} />
              </Button>
              <Title>
                <Animated.Text style={{ color: this.textColor, fontSize: 20, fontWeight: "300" }}>
                  {this.props.info.username}
                </Animated.Text>
              </Title>
            </Body>
          </Header>
        </Animated.View>
        <Animated.ScrollView
          scrollEventThrottle={5}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.nScroll } } }], {
            useNativeDriver: true
          })}
          style={{ zIndex: 0 }}
        >
          <Animated.View
            style={{
              transform: [{ translateY: Animated.multiply(this.nScroll, 0.65) }, { scale: this.imgScale }],
              backgroundColor: THEME_COLOR
            }}
          >
            {this.props.info.username === this.props.userInfo.username ? (
              <View>
                <TouchableOpacity onPress={this.clickBackground.bind(this)}>
                  {imagesBackground == null ? (
                    <Animated.Image
                      source={{ uri: this.props.userInfo.profile.banner || fakeBanner }}
                      style={{ height: 250, width: "100%" }}
                    />
                  ) : (
                    imagesBackground.map((item, idx) => (
                      <Animated.Image key={idx} source={{ uri: item.path }} style={{ height: 250, width: "100%" }} />
                    ))
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 20, marginTop: -120, height: 120 }}
                  onPress={this.clickAvatar.bind(this)}
                >
                  {images === null ? (
                    <Animated.Image
                      source={{ uri: this.props.userInfo.profile.picture || fakeAvatar }}
                      style={styles.avatar}
                    />
                  ) : (
                    images.map((item, idx) => (
                      <Animated.Image key={idx} source={{ uri: item.path }} style={styles.avatar} />
                    ))
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Animated.Image
                  source={{ uri: info.profile.banner || fakeBanner }}
                  style={{ height: 200, width: "100%" }}
                />
                <View style={{ flexDirection: "row", marginLeft: 20, marginTop: -120, height: 120 }}>
                  <Animated.Image source={{ uri: info.profile.picture || fakeBanner }} style={styles.avatar} />
                </View>
              </View>
            )}
          </Animated.View>

          <Animated.View style={{ zIndex: 1, width: "100%", backgroundColor: "white" }}>
            <ScrollView style={{ marginLeft: 10 }}>{content}</ScrollView>
          </Animated.View>
          <View />
        </Animated.ScrollView>
      </View>
    );
  }
}

const WallWithData = compose(
  connect(
    ({ userInfo }) => ({ userInfo }),
    dispatch => ({
      dispatch
    })
  ),
  graphql(GET_FEEDS_QUERY, { name: "getFeeds" }),
  graphql(ChangeAvatar, { name: "avatarChanger" }),
  graphql(ChangeBanner, { name: "bannerChanger" })
)(Wall);

export default WallWithData;
