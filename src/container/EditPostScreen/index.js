import React, { Component } from "react";
import { Keyboard, Alert } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { compose, graphql } from "react-apollo";
import axios from "axios";

import CRUDPost from "../../components/CRUDPost";
import EDIT_POST from "../../graphql/mutations/editPost";
import { POST_PRIVACY, MEDIA_SERVER } from "../../constants";

@compose(
  connect(
    null,
    (dispatch) => ({dispatch}),
  ),
  graphql(EDIT_POST, { name: "editPost" })
)
class EditPostScreen extends Component {
  handlePressPost = async (text, images, privacyIndex) => {
    const { postId } = this.props.navigation.state.params;

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
        // store all information get from media server
        photos = response.data.map(item => JSON.stringify(item));
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

    this.props.editPost({
      variables: {
        _id: postId,
        message: text,
        isMobile: true,
        photos,
        privacy: POST_PRIVACY[privacyIndex]
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
