import { gql } from "apollo-boost";

export default gql`
  mutation createNewPost($message: String!){
    createNewPost(message: $message){
      _id
      message
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
