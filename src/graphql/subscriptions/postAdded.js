import { gql } from "apollo-boost";
import PostFragments from "../fragments/PostFragments";

export default gql`
  subscription postAdded{
    postAdded {
      ...PostView
    }
  }
  ${PostFragments.postView}
`;
