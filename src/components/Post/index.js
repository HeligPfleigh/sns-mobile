import React, { Component } from "react";
import { View, StyleSheet, Text, FlatList,
  Keyboard, Platform, ScrollView } from "react-native";
import Modal from "react-native-modal";

import { colors } from "../../constants";
import FeedCardHeader from "../FeedCard/FeedCardHeader";
import FeedComment from "../FeedCard/FeedComments";
import AddCommentSection from "../AddCommentSection";
import PhotoContainer from "../Photos/PhotoContainer";
import PhotoViewer from "../Photos/PhotoViewer";
import FeedCardBottom from "../../components/FeedCard/FeedCardBottom";
import SharedPost from "./SharedPost";
import SharedModal from "./SharedModal";

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
  commentContainer: {
    height: Platform.OS === "ios" ? "50%" : "40%",
    alignSelf: "stretch",
  },
  textContent: {
    fontSize: 14,
    textAlign: "left",
    fontWeight: "500",
    color: colors.SECONDARY,
  },
  addCommentContainer: {
    position: "absolute",
    width: "100%",
    height: 50,
    zIndex: 2,
  },
});

class Post extends Component {
  state = {
    bottom: 0,
    selected: null,
    position: null,
    sharingModalVisible: false,
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (e) => {
    this.setState({ bottom: Platform.OS === "ios" ? e.endCoordinates.height : 0});
  }

  _keyboardDidHide = () => {
    this.setState({ bottom: 0 });
  }

  _renderComment = (item) => {
    const { _id } = this.props.post;
    return <FeedComment commentInfo={item.item} postID={_id} canReply={true}/>;
  }

  showImage = (selected, position) => {
    this.setState({
      selected,
      position,
    });
  }

  closeViewer = () => {
    this.setState({
      selected: null,
      position: null,
    });
  }

  renderViewer(){
    const { selected, position } = this.state;
    if (selected){
      return (
        <PhotoViewer
          image={selected}
          position={position}
          onClose={this.closeViewer}
        />
      );
    }
  }

  _onToggleSharingModal = (visible) => this.setState({
    sharingModalVisible: visible,
  })

  render(){
    const { author, createdAt, messagePlainText, _id,
      isLiked, totalComments, totalLikes,
      comments, user, building, photos, sharing } = this.props.post;

    const { sharingModalVisible } = this.state;

    const listImage = photos ? photos.map((item, index) =>
      <PhotoContainer image={JSON.parse(item).URL} key={index} onPress={this.showImage}/>
    ) : null;

    return (
      <View style={{ flex: 1 }}>
        <FeedCardHeader
          {...author}
          createdAt={createdAt}
          postId={_id}
          friendShared={user}
          buildingShared={building}
        />
        <ScrollView style={styles.contentContainer} alwaysBounceVertical={false}>
          <Text style={styles.textContent}>
            {messagePlainText}
          </Text>
          {listImage}

          { sharing ? <SharedPost postID={sharing._id}/> : null }

          <FeedCardBottom
            postID={_id}
            isLiked={isLiked}
            totalComments={totalComments}
            totalLikes={totalLikes}
            onToggleSharingModal={this._onToggleSharingModal}
            />
          <View style={styles.commentContainer}>
            {totalComments > 0
              ? <FlatList
                  data={comments}
                  keyExtractor={item => item._id}
                  renderItem={this._renderComment}
                  />
              : null}
          </View>
          <View style={{height: 200}} />
        </ScrollView>
        <View style={[styles.addCommentContainer, { bottom: this.state.bottom }]}>
          <AddCommentSection postId={_id} commentID={null}/>
        </View>
        {this.renderViewer()}
        <Modal
          isVisible={sharingModalVisible}
          style={{alignItems: "center"}}
          onBackdropPress={() => this._onToggleSharingModal(false)}>
          <SharedModal onToggleSharingModal={this._onToggleSharingModal} sharingPostID={_id}/>
        </Modal>
      </View>
    );
  }
}

export default Post;
