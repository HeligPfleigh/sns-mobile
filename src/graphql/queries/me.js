import { gql } from "apollo-boost";

export default gql`
  {
    me{
      _id
      username
      fullName
      profile {
        picture
      }
      email {
        address
      }
      totalNotification
    }
  }
`;
