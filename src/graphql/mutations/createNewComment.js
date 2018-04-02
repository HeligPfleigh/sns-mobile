import { gql } from "apollo-boost";

export default gql`
  mutation createNewComment($_id: String!, $message: String!, $commentId: String, $isMobile: Boolean!){
    createNewComment(_id: $_id, message: $message, commentId: $commentId, isMobile: $isMobile){
      _id
      message
      messagePlainText
      user {
        _id
        username
        profile {
          picture
        }
      }
      createdAt
    }
  }
`;
