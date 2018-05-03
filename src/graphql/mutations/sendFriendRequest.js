import { gql } from "apollo-boost";

export default gql`
  mutation sendFriendRequest($_id: String!) {
    sendFriendRequest(_id: $_id) {
      username
      friendStatus
    }
  }
`;
