import { gql } from "apollo-boost";

export default gql`
  query SearchQuery($keyword: String!) {
    search(keyword: $keyword) {
      username
      _id
      friendStatus
      profile {
        picture
      }
      building {
        name
      }
    }
  }
`;
