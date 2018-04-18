import { gql } from "apollo-boost";
import CommentFragment from "../fragments/CommentFragments";

export default gql`
  subscription commentAdded($postID: String!, $commentID: String){
    commentAdded(postID: $postID, commentID: $commentID){
      ...CommentView
    }
  }
  ${CommentFragment.commentView}
`;
