import { gql } from "apollo-boost";
import PostFragments from "../fragments/PostFragments";

export default gql`
  mutation createNewPost($message: String!, $isMobile: Boolean!, $photos: [String], $privacy: PrivacyType){
    createNewPost(message: $message, isMobile: $isMobile, photos: $photos, privacy: $privacy){
      ...PostView
    }
  }
  ${PostFragments.postView}
`;
