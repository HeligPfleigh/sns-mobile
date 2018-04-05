import { gql } from "apollo-boost";

export default gql`
  subscription postAdded{
    postAdded {
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
      createdAt
      totalLikes
      totalComments
      isLiked
    }
  }
`;
