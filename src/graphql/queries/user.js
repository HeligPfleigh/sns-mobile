import { gql } from "apollo-boost";

export default gql`
  query user($_id: String!) {
    user(_id: $_id) {
      _id
      username
      totalFriends
      isFriend
      posts {
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
          _id
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
      phone {
        number
      }
      profile {
        picture
        gender
        dob
        address
      }
      email {
        address
      }
      building {
        name
      }
    }
  }
`;
