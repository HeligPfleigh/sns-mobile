import { gql } from "apollo-boost";

export default gql`
  mutation Mutation($_id: String!){
    likePost(_id: $_id){
      _id
      isLiked
    }
  }
`;
