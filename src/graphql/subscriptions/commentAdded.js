import { gql } from "apollo-boost";

export default gql`
  subscription commentAdded($postID: String!, $commentID: String){
    commentAdded(postID: $postID, commentID: $commentID){
      _id
      message
      user {
        _id
        username
        profile {
          picture
        }
      }
      messagePlainText
      reply {
        _id
        message
        user {
          _id
          username
          profile {
            picture
          }
        }
        messagePlainText
        reply {
          message
          messagePlainText
          createdAt
        }
        totalReply
        parent
        createdAt
        updatedAt
      }
      totalReply
      parent
      createdAt
      updatedAt
    }
  }
`;
