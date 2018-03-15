import { gql } from "apollo-boost";

export default gql`
  {
    me{
      username
      fullName
      profile {
        picture
      }
      email {
        address
      }
    }
  }
`;
