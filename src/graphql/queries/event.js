import { gql } from "apollo-boost";
import EventFragments from "../fragments/EventFragments";

export default gql`
  query event($_id: String!){
    event(_id: $_id){
      ...EventView
    }
  }
  ${EventFragments.eventView}
`;
