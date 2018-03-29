import { gql } from "apollo-boost";

export default gql`
  query building($_id: String!){
    building(_id: $_id){
      _id
      name
      addressString
      totalApartment
      apartments{
        _id
        name
      }
    }
  }
`;
