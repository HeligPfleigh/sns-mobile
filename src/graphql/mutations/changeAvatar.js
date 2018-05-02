import { gql } from "apollo-boost";

export default gql`
  mutation changeAvatar($picture: String!){
    changeAvatar(picture: $picture){
      username
      _id
    }
  }
`;
