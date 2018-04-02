import React, { Component } from "react";
import { Keyboard } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { compose, graphql } from "react-apollo";

import CRUDPost from "../../components/CRUDPost";
import EDIT_POST from "../../graphql/mutations/editPost";

@compose(
  connect(
    null,
    (dispatch) => ({dispatch}),
  ),
  graphql(EDIT_POST, { name: "editPost" })
)
class EditPostScreen extends Component {
  handlePressPost = (text) => {
    const { postId } = this.props.navigation.state.params;

    this.props.editPost({
      variables: {
        _id: postId,
        message: text,
        isMobile: true,
      },
      refetch: ["feeds"],
    });

    Keyboard.dismiss();
    this.props.dispatch(NavigationActions.back());
  }

  render(){
    const { message } = this.props.navigation.state.params;
    return (
      <CRUDPost message={message} handlePressPost={this.handlePressPost}/>
    );
  }
}

export default EditPostScreen;
