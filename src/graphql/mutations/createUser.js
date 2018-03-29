import { gql } from "apollo-boost";

export default gql`
  mutation createUser($user: CreateUserInput!){
    createUser(user:$user){
      _id
      username
    }
  }
`;

