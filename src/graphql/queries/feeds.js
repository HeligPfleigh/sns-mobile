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
        createdAt
        totalLikes
        totalComments
        isLiked
      }
    }
  }
`;
