import { gql } from "apollo-boost";
import PostFragments from "../fragments/PostFragments";

export default gql`
  query user($_id: String!) {
    user(_id: $_id) {
      _id
      username
      totalFriends
      isFriend
      posts {
        ...PostView
      }
      phone {
        number
      }
      profile {
        picture
        gender
        dob
        address
        banner
      }
      email {
        address
      }
      building {
        name
      }
    }
  }
  ${PostFragments.postView}
`;
