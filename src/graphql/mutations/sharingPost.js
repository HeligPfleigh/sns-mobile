import { gql } from "apollo-boost";
import PostFragments from "../fragments/PostFragments";

export default gql`
  mutation sharingPost($_id: String!, $message: String!, $privacy: String!, $friendId: String, $isMobile: Boolean){
    sharingPost(_id: $_id, message: $message, privacy: $privacy, friendId: $friendId, isMobile: $isMobile){
      ...PostView
    }
  }
  ${PostFragments.postView}
`;
