import React, { Component } from "react";
import { View, Text, Icon, Tab, Tabs, TabHeading,  } from "native-base";
import { FlatList, Image,  TouchableOpacity } from "react-native";
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

class Wall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null,
      imagesBackground: null
    };
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
          variables: { banner: this.state.imagesBackground[0].path },
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
          variables: { picture: this.state.images[0].path },
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

  _renderItem = ({ item }) => <FeedCard {...item} />

  renderHeader = () => {
    const info = this.props.info;
    const { images, imagesBackground } = this.state;
    const data = this.props.data;

    return (
      <View>
        {this.props.info.username === this.props.userInfo.username ? (
          <View>
            <TouchableOpacity onPress={this.clickBackground.bind(this)}>
              {imagesBackground == null ? (
                <Image
                  source={{ uri: this.props.userInfo.profile.banner || fakeBanner }}
                  style={{ height: 200, width: "100%" }}
                />
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
                <Image source={{ uri: this.props.userInfo.profile.picture || fakeAvatar }} style={styles.avatar} />
              ) : (
                images.map((item, idx) => <Image key={idx} source={{ uri: item.path }} style={styles.avatar} />)
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Image source={{ uri: info.profile.banner || fakeBanner }} style={{ height: 200, width: "100%" }} />
            <View style={{ flexDirection: "row", marginLeft: 30, marginTop: -40, height: 100 }}>
              <Image source={{ uri: info.profile.picture || "https://blog.charmes.net/images/docker-whale.png" }} style={styles.avatar} />
            </View>
          </View>
        )}

        <View style={styles.header}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ textAlign: "center", fontSize: 25 }}>{this.props.info.username}</Text>
          </View>

          {this.props.info.username === this.props.userInfo.username ? <View /> : <Options info={info} data={data} />}

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
        ListFooterComponent={()=><View style={{height: 200}} />}
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
