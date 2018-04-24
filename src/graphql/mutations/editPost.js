import { gql } from "apollo-boost";
import PostFragments from "../fragments/PostFragments";

export default gql`
  mutation editPost($_id: String!, $message: String!, $isMobile: Boolean, $privacy: String, $photos: [String]){
    editPost(_id: $_id, message: $message, isMobile: $isMobile, privacy: $privacy, photos: $photos){
      ...PostView
    }
  }
  ${PostFragments.postView}
`;
