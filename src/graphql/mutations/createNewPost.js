import { gql } from "apollo-boost";

export default gql`
  mutation createNewPost($message: String!, $isMobile: Boolean!){
    createNewPost(message: $message, isMobile: $isMobile){
      _id
      message
      messagePlainText
      author {
        _id
        username
        profile {
          picture
        }
        email {
          address
        }
      }
      createdAt
      totalLikes
      totalComments
      isLiked
    }
  }
`;
