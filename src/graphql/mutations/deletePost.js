import { gql } from "apollo-boost";

export default gql`
  mutation deletePost($_id: String!){
    deletePost(_id: $_id){
      _id
      message
    }
  }
`;
