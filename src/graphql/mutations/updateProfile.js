import { gql } from "apollo-boost";

export default gql`
mutation updateProfile($profile: ProfileInput!) {
  updateProfile(profile: $profile) {
    _id
    username
    profile{
      fullName
      picture
      banner
      gender
      dob
      address
    }
  }
}
`;
