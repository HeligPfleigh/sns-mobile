import { gql } from "apollo-boost";

export default gql`
  mutation unlikePost($_id: String!){
    unlikePost(_id: $_id){
      _id
      isLiked
    }
  }
`;
