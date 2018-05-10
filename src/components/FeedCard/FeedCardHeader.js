import React, { Component } from "react";
import { CardItem, Body, Left, Text, Right, Icon } from "native-base";
import { StyleSheet } from "react-native";
import distanceInWordToNow from "date-fns/distance_in_words_to_now";
import { connect } from "react-redux";
import HeaderAvatar from "../HeaderAvatar";
import FeedCardEditMenu from "./FeedCardEditMenu";
import PopoverTooltip from "react-native-popover-tooltip";

const styles = StyleSheet.create({
  container: {
    maxHeight: 70
  },
  sharedText: {
    fontWeight: "700",
    color: "green",
    fontStyle: "italic"
  }
});

@connect(({ userInfo }) => ({
  userInfo: userInfo
}))
class FeedCardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      buttonRect: {}
    };
  }
  _handlePressNameSharing = () => {}

  render() {
    const { _id, username, createdAt, profile, userInfo, postId, message, friendShared, buildingShared } = this.props;
    let shareToFriendOrBuilding = null;
    // if sharing to friend, display his name
    if (friendShared && friendShared._id !== _id) {
      shareToFriendOrBuilding = ` > ${friendShared.username}`;
    }

    // display building name instead of friend name if it's not null
    if (buildingShared) {
      shareToFriendOrBuilding = ` > ${buildingShared.name}`;
    }
    return (
      <CardItem style={styles.container}>
        <Left>
          <HeaderAvatar avatar={profile.picture} id={_id} />
          <Body>
            <Text>
              {username}
              <Text style={styles.sharedText} onPress={this._handlePressNameSharing}>
                {shareToFriendOrBuilding}
              </Text>
            </Text>
            <Text note>{distanceInWordToNow(createdAt)} ago</Text>
          </Body>
        </Left>
        {userInfo.username === username ? (
          <Right>
            <PopoverTooltip
              buttonComponent={<Icon name="ios-more" style={{ fontSize: 30 }} />}
              items={[
                {
                  label : ()=>  <FeedCardEditMenu postId={postId} message={message} stuff={this.props} />,
                  onPress : ()=>{}
                }
              ]}
              animationType="spring"
              overlayStyle={{ backgroundColor: "transparent" }} // set the overlay invisible
              tooltipContainerStyle={{ borderRadius: 0 }}
              labelContainerStyle={{ backgroundColor: "white", width: 120, alignItems: "center" }}
            />
          </Right>
        ) : null}
      </CardItem>
    );
  }
}

export default FeedCardHeader;
