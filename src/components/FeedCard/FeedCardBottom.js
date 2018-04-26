import React, { Component } from "react";
import { CardItem, Text } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { graphql, compose } from "react-apollo";

import { colors } from "../../constants";
import LIKE_POST_MUTATION from "../../graphql/mutations/likePost";
import UNLIKE_POST_MUTATION from "../../graphql/mutations/unlikePost";

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
  constructor(props){
    super(props);
    const { isLiked, totalLikes } = this.props;
    this.state = {
      isLiked: isLiked,
      totalLikes: totalLikes,
    };
  }

  static defaultProps = {
    handlePressComment: emptyFn,
  }

  _handleLike = async () => {
    const { isLiked, totalLikes } = this.state;
    const { postID, likePostMutation, unlikePostMutation } = this.props;
    // unlike
    if ( isLiked ){
      await likePostMutation({
        variables:{
          _id: postID,
        }
      });
      this.setState({
        isLiked: false,
        totalLikes: totalLikes - 1,
      });
      return;
    }
    // like
    else {
      await unlikePostMutation({
        variables:{
          _id: postID,
        }
      });
      this.setState({
        isLiked: true,
        totalLikes: totalLikes + 1,
      });
    }
  }

  render(){
    const { totalComments, handlePressComment } = this.props;
    const { isLiked, totalLikes } = this.state;
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

        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIcons name="share" size={ICON_SIZE} color={colors.LIGHT_GRAY}/>
        </TouchableOpacity>
      </CardItem>
    );
  }
}

export default FeedCardBottom;
