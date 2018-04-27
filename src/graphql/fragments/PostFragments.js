import { gql } from "apollo-boost";

export default {
  postView: gql`
    fragment PostView on Post{
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
      sharing {
        _id
      }
      createdAt
      totalLikes
      totalComments
      isLiked
    }
  `,
};
