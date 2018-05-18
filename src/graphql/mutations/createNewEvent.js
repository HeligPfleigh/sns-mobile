import { gql } from "apollo-boost";
import EventFragments from "../fragments/EventFragments";
export default gql`
  mutation createNewEvent($input: CreateEventInput!) {
    createNewEvent(input: $input) {
      ...EventView
    }
  }
  ${EventFragments.eventView}
`;
