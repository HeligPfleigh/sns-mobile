import { gql } from "apollo-boost";

export default gql`
  query post( $_id : String!, $limit: Int){
    post( _id: $_id){
      _id
      message
      messagePlainText
      author {
        username
        profile {
          picture
        }
        email {
          address
        }
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
      comments(limit: $limit) {
        _id
        message
        user {
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
      isLiked
      createdAt
    }
  }
`;
