import React, { Component } from "react";
import { StyleSheet, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { Card } from "native-base";
import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import FeedCardHeader from "../FeedCard/FeedCardHeader";
import GET_POST_QUERY from "../../graphql/queries/post";
import FeedCardPhotos from "../../components/Photos/FeedCardPhotos";
import { lineBreakCount } from "../../utils/common";
import { colors } from "../../constants";

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
  textContent: {
    fontSize: 14,
    textAlign: "left",
    fontWeight: "500",
    color: colors.SECONDARY,
  },
  postIsRemovedContainer: {
    flex: 1,
    alignItems: "center",
  },
  postIsRemovedText:{
    color: colors.PRIMARY,
    fontSize: 14,
    padding: 20,
  },
});

@compose(
  connect(
    dispatch => ({ dispatch })
  ),
  graphql(GET_POST_QUERY, {
    options: ownProps => {
      return {
        variables: {
          _id: ownProps.postID,
          limit: 0
        }
      };
    }
  })
)
class SharedPost extends Component{
  pressOnSharedPost = () => {
    const { post: { _id } } = this.props.data;
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: "PostDetail",
        params: {
          postID: _id,
          limit: 0,
        }
      })
    );
  }

  render(){
    let content;
    if ( this.props.data.loading ){
      content = <ActivityIndicator size="large"/>;
    }
    else {
      const { post } = this.props.data;

      if (!post) {return null;}

      const { messagePlainText, createdAt, author, _id, user, building, photos } = post;

      let displayText = messagePlainText;
      // strim 80 first characters
      const shortenText = messagePlainText.length > 100 ? messagePlainText.substring(0, 100) : messagePlainText;
      displayText = shortenText;
      // get the first line of this sentences
      if (lineBreakCount(shortenText) > 1) {
        const firstLine = messagePlainText.split("\n")[0];
        displayText = `${firstLine}...`;
      }
      else {
        displayText = `${shortenText}...`;
      }

      content =
        <TouchableOpacity onPress={this.pressOnSharedPost}>
          <FeedCardHeader
            {...author}
            createdAt={createdAt}
            postId={_id}
            friendShared={user}
            buildingShared={building}
            />
          <ScrollView style={styles.contentContainer} alwaysBounceVertical={false}>
            <Text style={styles.textContent}>
              {displayText}
            </Text>
            <FeedCardPhotos photos={photos} height={150}/>
          </ScrollView>
        </TouchableOpacity>;
    }
    return (
      <Card>
        {content}
      </Card>
    );
  }
}

export default SharedPost;
