import React, { Component } from "react";
import { Header, Left, Button, Body, Title, Right } from "native-base";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { compose, graphql } from "react-apollo";

import Layout from "../../components/Layout";
import { colors } from "../../constants";
import AddCommentSection from "../../components/AddCommentSection";
import GET_COMMENT_QUERY from "../../graphql/queries/comment";
import FeedComments from "../../components/FeedCard/FeedComments";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: colors.WHITE,
  },
  addCommentContainer: {
    position: "absolute",
    width: "100%",
    height: 50,
    zIndex: 2,
  },
  commentContainer: {
    height: "90%",
    alignSelf: "stretch",
  },
});

@compose(
  connect(
    null,
    dispatch => ({ dispatch })
  ),
  graphql(GET_COMMENT_QUERY, {
    options: (ownProps) => {
      return {
        variables: {
          _id: ownProps.navigation.state.params.commentID,
        }
      };
    }
  }),
)
class CommentReplyScreen extends Component {
  state = {
    top: "90%",
  }

  _handlePressBack = () => {
    this.props.dispatch(NavigationActions.back());
  }

  _renderItem = (item) => {
    const { postID } = this.props.navigation.state.params;
    return <FeedComments commentInfo={item.item} postID={postID}/>;
  }

  render() {
    const { commentID, postID } = this.props.navigation.state.params;

    let content;
    const { loading } = this.props.data;
    if (loading) {
      content = <ActivityIndicator size="large"/>;
    }
    else {
      const { reply } = this.props.data.comment;
      content = <FlatList
            contentContainerStyle={{ alignSelf: "stretch" }}
            data={reply}
            keyExtractor={item => item._id}
            renderItem={this._renderItem}
          />;
    }

    return (
      <Layout navigation={this.props.navigation}>
        <Header>
          <Left>
            <Button transparent onPress={this._handlePressBack}>
              <MaterialIcons name="arrow-back" size={20} color={colors.PRIMARY}/>
            </Button>
          </Left>
          <Body>
            <Title>Reply</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.container}>
          <View style={styles.commentContainer}>
            {content}
          </View>
          <View style={[styles.addCommentContainer, { top: this.state.top }]}>
            <AddCommentSection postId={postID} commentID={commentID}/>
          </View>
        </View>
      </Layout>
    );
  }
}

export default CommentReplyScreen;
