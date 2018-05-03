import { gql } from "apollo-boost";

export default gql`
  mutation rejectFriend($_id: String!) {
    rejectFriend(_id: $_id) {
      username
      _id
    }
  }
`;
