import { gql } from "apollo-boost";
import EventFragments from "../fragments/EventFragments";

export default gql`
  query listEvent($limit: Int, $cursor: String) {
    listEvent(limit: $limit, cursor: $cursor) {
      pageInfo {
        endCursor
        hasNextPage
        total
        limit
      }
      edges {
        ...EventView
      }
    }
  }
  ${EventFragments.eventView}
`;
