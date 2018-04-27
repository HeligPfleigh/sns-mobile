import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView, ActivityIndicator } from "react-native";
import { Card } from "native-base";
import { compose, graphql } from "react-apollo";

import FeedCardHeader from "../FeedCard/FeedCardHeader";
import GET_POST_QUERY from "../../graphql/queries/post";
import FeedCardPhotos from "../../components/Photos/FeedCardPhotos";

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
  render(){
    let content;
    if ( this.props.data.loading ){
      content = <ActivityIndicator size="large"/>;
    }
    else {
      const { post } = this.props.data;

      if (!post) {return null;}

      const { messagePlainText, createdAt, author, _id, user, building, photos } = post;
      content =
        <View>
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
            <FeedCardPhotos photos={photos} height={150}/>
          </ScrollView>
        </View>;
    }
    return (
      <Card>
        {content}
      </Card>
    );
  }
}

export default SharedPost;
