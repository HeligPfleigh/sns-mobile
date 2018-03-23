import { gql } from "apollo-boost";

export default gql`
  query comment($_id: String!){
    comment(_id: $_id){
      _id
      totalReply
      reply{
        _id
        message
        user {
          username
          profile {
            picture
          }
        }
        messagePlainText
        reply {
          message
          messagePlainText
          createdAt
        }
        totalReply
        parent
        createdAt
        updatedAt
      }
    }
  }
`;
