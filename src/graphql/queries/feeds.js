import { gql } from "apollo-boost";

export default gql`
  query feeds($limit: Int, $cursor: String) {
    feeds(limit: $limit, cursor: $cursor) {
      pageInfo {
        endCursor
        hasNextPage
        total
        limit
      }
      edges {
        _id
        message
        messagePlainText
        comments {
          _id
          message
          user {
            username
            profile {
              picture
            }
          }
          messagePlainText
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
  }
`;
