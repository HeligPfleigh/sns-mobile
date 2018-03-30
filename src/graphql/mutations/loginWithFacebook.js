import { gql } from "apollo-boost";

export default gql`
  mutation loginWithFacebook($token: String!){
    loginWithFacebook(token: $token){
      id_token
    }
  }
`;
