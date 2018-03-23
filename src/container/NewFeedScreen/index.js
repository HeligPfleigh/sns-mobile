import React, { Component } from "react";
import { Keyboard } from "react-native";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { NavigationActions } from "react-navigation";

import CREATE_NEW_POST from "../../graphql/mutations/createNewPost";
import GET_FEEDS_QUERY from "../../graphql/queries/feeds";
import CRUDPost from "../../components/CRUDPost";

@compose(
  connect(
    null ,
    dispatch => ({ dispatch })
  ),
  graphql(CREATE_NEW_POST, {name: "createNewPost"}),
)
class NewFeedContainer extends Component {
  _handlePressPost = (text) => {
    this.props.createNewPost({
      variables: {
        message: text,
        isMobile: true,
      },
      update: (store, { data: { createNewPost } }) => {
        const data = store.readQuery({
          query: GET_FEEDS_QUERY,
          variables: { limit: 5 },
        });
        data.feeds.edges.unshift(createNewPost);
        store.writeQuery({
          query: GET_FEEDS_QUERY,
          variables: { limit: 5 },
          data
        });
      }
    });
    Keyboard.dismiss();
    this.props.dispatch(NavigationActions.back());
  }

  render(){
    const { message } = this.props.navigation.state.params;
    return (
      <CRUDPost message={message} handlePressPost={this._handlePressPost}/>
    );
  }
}

export default NewFeedContainer;
