import { gql } from "apollo-boost";

export default gql`
  query post( $_id : String!, $limit: Int){
    post( _id: $_id){
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
      totalLikes
      totalComments
      comments(limit: $limit) {
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
      isLiked
      createdAt
    }
  }
`;
