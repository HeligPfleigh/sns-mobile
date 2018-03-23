import { gql } from "apollo-boost";

export default gql`
  mutation editPost($_id: String!, $message: String!){
    editPost(_id: $_id, message: $message){
      _id
      message
      messagePlainText
    }
  }
`;
