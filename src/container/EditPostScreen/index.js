import React, { Component } from "react";

import CRUDPost from "../../components/CRUDPost";

class EditPostScreen extends Component {
  handlePressPost = (text) => {
    // console.log(text);
  }

  render(){
    const { message } = this.props.navigation.state.params;
    return (
      <CRUDPost message={message} handlePressPost={this.handlePressPost}/>
    );
  }
}

export default EditPostScreen;
