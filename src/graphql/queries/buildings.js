import { gql } from "apollo-boost";

export default gql`
  query buildings($query: String!){
    buildings(query: $query){
      _id
      name
      addressString
    }
  }
`;
