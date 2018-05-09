import { gql } from "apollo-boost";

export default gql`
mutation updateRead($_id: String!) {
  updateRead(_id: $_id) {
    _id
  }
}
`;
