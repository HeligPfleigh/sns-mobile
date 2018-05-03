import { gql } from "apollo-boost";

export default gql`
  mutation acceptFriend($_id: String!) {
    acceptFriend(_id: $_id) {
      username
      _id
    }
  }
`;
