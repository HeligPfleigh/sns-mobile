import { gql } from "apollo-boost";

export default gql`
  mutation createNewPost($message: String!, $isMobile: Boolean!){
    createNewPost(message: $message, isMobile: $isMobile){
      _id
      message
      messagePlainText
      comments {
        message
        createdAt
        user{
          username
          profile{
            picture
          }
        }
      }
      author {
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
