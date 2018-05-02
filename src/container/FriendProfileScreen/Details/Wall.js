import React, { Component } from "react";
import { View, Text, Icon, Tab, Tabs, TabHeading, Button  } from "native-base";
import { FlatList, Image, Dimensions, TouchableOpacity } from "react-native";
import FeedCard from "../../../components/FeedCard/FeedCard";
import styles from "../styles";
import Intro from "./Intro";
import Friends from "./Friends";
import ImagePicker from "react-native-image-crop-picker";
import Images from "../../../assets/images";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import ChangeAvatar from "../../../graphql/mutations/changeAvatar";
import ChangeBanner from "../../../graphql/mutations/changeBanner";

class Wall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null,
      imagesBackground: null
    };
  }


  clickAvatar() {
    const imageUpload = ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
      mediaType: "photo"
    })

      .then(imageUpload => {
        this.setState({
          images: imageUpload
        });
        this.props.avatarChanger({
          variables: { picture: this.state.images[0].path }
        });

      })
      .catch(err => {
        this.setState({
          images: null
        });
        throw (err);
      });
  }

  clickBackground() {
    const imageUpload = ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
      mediaType: "photo"
    })

      .then(imageUpload => {
        this.setState({
          imagesBackground: imageUpload
        });
        this.props.bannerChanger({
          variables: { banner: this.state.imagesBackground[0].path }
        });
      })
      .catch(err => {
        this.setState({
          images: null
        });
        throw (err);
      });
  }

  _renderItem = ({ item }) => <FeedCard {...item} />

  renderHeader = () => {
    const info = this.props.info;
    const { images, imagesBackground } = this.state;

    return (
      <View>
        {this.props.info.username === this.props.userInfo.username ? (
          <View>
            <TouchableOpacity onPress={this.clickBackground.bind(this)}>
              {imagesBackground == null ? (
                <Image source={{ uri: info.profile.banner }} style={{ height: 200, width: "100%" }} />
              ) : (
                imagesBackground.map((item, idx) => (
                  <Image key={idx} source={{ uri: item.path }} style={{ height: 250, width: "100%" }} />
                ))
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: "row", marginLeft: 30, marginTop: -40, height: 100 }}
              onPress={this.clickAvatar.bind(this)}
            >
              {images === null ? (
                <Image source={{ uri: info.profile.picture }} style={styles.avatar} />
              ) : (
                images.map((item, idx) => <Image key={idx} source={{ uri: item.path }} style={styles.avatar} />)
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Image
              source={info.profile.banner == null ? Images.backgroundHeader : info.profile.banner}
              style={{ height: 200, width: "100%" }}
            />
            <View style={{ flexDirection: "row", marginLeft: 30, marginTop: -40, height: 100 }}>
              <Image source={{ uri: this.props.info.profile.picture }} style={styles.avatar} />
            </View>
          </View>
        )}

        <View style={styles.header}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ textAlign: "center", fontSize: 25 }}>{this.props.info.username}</Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Button info style={{ width: Dimensions.get("window").width / 3.5, margin: 5 }}>
              <Text style={{ textAlign: "center" }}> Kết bạn</Text>
            </Button>
            <Button danger style={{ width: Dimensions.get("window").width / 3.5, margin: 5 }}>
              <Text> Theo dõi</Text>
            </Button>
            <Button success style={{ width: Dimensions.get("window").width / 3.5, margin: 5 }}>
              <Text> Nhắn tin</Text>
            </Button>
          </View>

          <Tabs style={{ paddingTop: 5 }}>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="person-add" />
                  <Text style={{ fontWeight: "bold" }}>Giới thiệu</Text>
                </TabHeading>
              }
            >
              <Intro info={info} />
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-people-outline" />
                  <Text style={{ fontWeight: "bold" }}>Bạn bè</Text>
                </TabHeading>
              }
            >
              <Friends info={info} />
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-code-working" />
                  <Text style={{ fontWeight: "bold" }}>Khác</Text>
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
        data={this.props.info.posts}
        renderItem={this._renderItem.bind(this)}
        ListHeaderComponent={this.renderHeader}
      />
    );

    return (
      <View>
        <View>{content}</View>
      </View>
    );
  }
}
const WallWithData = compose(
  connect(({ userInfo }) => ({ userInfo })),
  graphql(ChangeAvatar, { name: "avatarChanger" }),
  graphql(ChangeBanner, { name: "bannerChanger" })
)(Wall);

export default WallWithData;
