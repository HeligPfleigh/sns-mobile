import { gql } from "apollo-boost";

export default gql`
  mutation createNewPost($message: String!, $isMobile: Boolean!, $photos: [String]){
    createNewPost(message: $message, isMobile: $isMobile, photos: $photos){
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
      user {
        _id
        username
      }
      building {
        _id
        name
      }
      photos
      createdAt
      totalLikes
      totalComments
      isLiked
    }
  }
`;
