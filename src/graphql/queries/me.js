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
      totalUnreadNotification
      friendSuggestions {
        username
        _id
        profile {
          picture
        }
        building {
          name
        }
      }
      friends {
        _id
        username
      }
      friendRequests {
        username
        _id
        profile {
          picture
        }
        building {
          name
        }
      }
    }
  }
`;
