import { gql } from "apollo-boost";

export default gql`
  mutation createNewComment($_id: String!, message: String!, commentId: String, isMobile: Boolean!){
    _id
    message
    messagePlainText
    user {
      username
      profile {
        picture
      }
    }
    createAt
  }
`;
