import { gql } from "apollo-boost";

export default gql`
  query post( $_id : String!){
    post( _id: $_id){
      message
      messagePlainText
      author {
        username
        chatId
        createdAt
        updatedAt
      }
      user {
        username
        fullName
        chatId
        totalFriends
        isFriend
        createdAt
        updatedAt
      }
      building {
        name
        display
        addressString
        isAdmin
        totalApartment
        createdAt
        updatedAt
      }
      totalLikes
      totalComments
      comments {
        message
        messagePlainText
        totalReply
        parent
        createdAt
        updatedAt
      }
      isLiked
      createdAt
    }
  }
`;
