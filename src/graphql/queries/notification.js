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
      user
      seen
      _id
      isRead
      createdAt
      updatedAt
      type
      subject {
        messagePlainText
        totalLikes
        totalComments
      }
      actors {
        _id
        username
        phone
        email{
          address
        }
        profile {
          picture
        }
        chatId
        posts {
          _id
          meesage
          messagePlainText
        }
      }
    }
  }
}
`;
