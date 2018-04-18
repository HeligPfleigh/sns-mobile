import { gql } from "apollo-boost";
import PostFragments from "../fragments/PostFragments";

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
        ...PostView
      }
    }
  }
  ${PostFragments.postView}
`;
