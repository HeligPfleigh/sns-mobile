import React, { Component } from "react";
import { Keyboard, Alert } from "react-native";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { NavigationActions } from "react-navigation";
import axios from "axios";

import CREATE_NEW_POST from "../../graphql/mutations/createNewPost";
// import GET_FEEDS_QUERY from "../../graphql/queries/feeds";
import CRUDPost from "../../components/CRUDPost";
import { MEDIA_SERVER } from "../../constants";

@compose(
  connect(
    null ,
    dispatch => ({ dispatch })
  ),
  graphql(CREATE_NEW_POST, {name: "createNewPost"}),
)
class NewFeedContainer extends Component {
  _handlePressPost = async (text, images) => {
    let photos = [];
    if (images){
      const body = new FormData();
      const url = `${MEDIA_SERVER}/api/upload`;

      images.forEach(image => {
        let filename = image.path.replace(/^.*[\\\/]/, "");
        let file = {
          uri: image.path,
          name: filename,
          type: image.mime,
        };
        body.append("files", file);
      });


      try {
        const response = await axios.post(url, body);
        photos = response.data.map(item => item.URL);
      } catch (err) {

        Alert.alert(
          "Lỗi",
          "Không thể tải tệp lên máy chủ!",
          [
            {
              text: "Quay về",
            }
          ],
          { cancelable: false }
        );

        return;
      }
    }

    await this.props.createNewPost({
      variables: {
        message: text,
        isMobile: true,
        photos,
      },
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
