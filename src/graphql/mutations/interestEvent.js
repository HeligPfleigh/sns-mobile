import { gql } from "apollo-boost";

export default gql`
  mutation interestEvent($eventId: String!) {
    interestEvent(eventId: $eventId) {
      _id
      author {
        username
        chatId
        createdAt
        updatedAt
      }
      building {
        name
        display
        addressString
        isAdmin
        totalApartment
        createdAt
        updatedAt
      }
    }
  }
`;
