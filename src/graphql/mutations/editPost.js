import { gql } from "apollo-boost";

export default gql`
  mutation editPost($_id: String!, $message: String!, $isMobile: Boolean){
    editPost(_id: $_id, message: $message, isMobile: $isMobile){
      _id
      message
      messagePlainText
    }
  }
`;
