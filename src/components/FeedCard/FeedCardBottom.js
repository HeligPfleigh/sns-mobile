import React, { Component } from "react";
import { CardItem, Text } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { graphql, compose } from "react-apollo";

import { colors } from "../../constants";
import LIKE_POST_MUTATION from "../../graphql/mutations/likePost";
import UNLIKE_POST_MUTATION from "../../graphql/mutations/unlikePost";
import GET_FEEDS_QUERY from "../../graphql/queries/feeds";
import GET_POST_QUERY from "../../graphql/queries/post";

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: "row",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 32,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.LIGHT_GRAY,
  }
});

const ICON_SIZE = 20;

const emptyFn = () => {};

@compose(
  graphql(LIKE_POST_MUTATION, { name: "unlikePostMutation"}),
  graphql(UNLIKE_POST_MUTATION, { name: "likePostMutation" }),
)
class FeedCardBottom extends Component{

  static defaultProps = {
    handlePressComment: emptyFn,
    onToggleSharingModal: emptyFn,
  }

  _handleLike = async () => {
    const { isLiked, postID, likePostMutation, unlikePostMutation } = this.props;
    // unlike
    if ( isLiked ){
      await likePostMutation({
        variables:{
          _id: postID,
        },
        refetchQueries : [
          { query: GET_FEEDS_QUERY, variables: { limit: 5 }},
          { query: GET_POST_QUERY, variables: { _id: postID }}
        ],
      });
      return;
    }
    // like
    else {
      await unlikePostMutation({
        variables:{
          _id: postID,
        },
        refetchQueries : [
          { query: GET_FEEDS_QUERY, variables: { limit: 5 }},
          { query: GET_POST_QUERY, variables: { _id: postID }}
        ],
      });
    }
  }

  render(){
    const { totalComments, handlePressComment, onToggleSharingModal, postID, isLiked, totalLikes } = this.props;
    return (
      <CardItem style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this._handleLike}>
          <MaterialCommunityIcons name="thumb-up-outline" size={ICON_SIZE} color={isLiked ? colors.PRIMARY : colors.LIGHT_GRAY}/>
          <Text style={styles.buttonText}> {totalLikes} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handlePressComment()}>
          <MaterialCommunityIcons name="comment-processing-outline" size={ICON_SIZE} color={colors.LIGHT_GRAY}/>
          <Text style={styles.buttonText}> {totalComments} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => onToggleSharingModal(true, postID)}>
          <MaterialCommunityIcons name="share" size={ICON_SIZE} color={colors.LIGHT_GRAY}/>
        </TouchableOpacity>
      </CardItem>
    );
  }
}

export default FeedCardBottom;
