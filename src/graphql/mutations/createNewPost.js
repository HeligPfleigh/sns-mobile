import { gql } from "apollo-boost";

export default gql`
  mutation createNewPost($message: String!){
    createNewPost(message: $message){
      _id
      author {
        username
        chatId
        createdAt
        updatedAt
      }
      totalLikes
      totalComments
      isLiked
      message
    }
  }
`;
