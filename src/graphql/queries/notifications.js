import { gql } from "apollo-boost";

export default gql`
query notifications($limit: Int, $cursor: String) {
  notifications(limit: $limit, cursor: $cursor) {
    pageInfo {
      endCursor
      hasNextPage
      total
      limit
    }
    edges {
      seen
      _id
      isRead
      createdAt
      updatedAt
      type
      subject {
        messagePlainText
        totalLikes
        _id
        type
        privacy
        event {
          _id
          author{
            _id
            username
          }
        }
      }
      actors {
        _id
        username
        profile {
          picture
        }
        email {
          address
        }
      }
    }
  }
}
`;
