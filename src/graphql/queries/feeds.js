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
        createdAt
        totalLikes
        totalComments
        isLiked
      }
    }
  }
`;
