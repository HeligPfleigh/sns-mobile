import { gql } from "apollo-boost";

export default gql`
  query buildings($query: String!, $limit: Int){
    buildings(query: $query){
      _id
      name
    }
  }
`;
