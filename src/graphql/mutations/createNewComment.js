import { gql } from "apollo-boost";
import CommentFragment from "../fragments/CommentFragments";

export default gql`
  mutation createNewComment($_id: String!, $message: String!, $commentId: String, $isMobile: Boolean!){
    createNewComment(_id: $_id, message: $message, commentId: $commentId, isMobile: $isMobile){
      ...CommentView
    }
  }
  ${CommentFragment.commentView}
`;
