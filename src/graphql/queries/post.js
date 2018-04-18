import { gql } from "apollo-boost";
import PostFragments from "../fragments/PostFragments";
import CommentFragments from "../fragments/CommentFragments";

export default gql`
  query post( $_id : String!, $limit: Int){
    post( _id: $_id){
      ...PostView
      comments(limit: $limit) {
        ...CommentView
      }
    }
  }
  ${PostFragments.postView}
  ${CommentFragments.commentView}
`;
