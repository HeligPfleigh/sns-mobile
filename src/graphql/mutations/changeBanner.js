import { gql } from "apollo-boost";

export default gql`
  mutation changeBannerImage($banner: String!){
    changeBannerImage(banner: $banner){
      username
      _id
    }
  }
`;
