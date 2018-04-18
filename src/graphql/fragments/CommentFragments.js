import { gql } from "apollo-boost";

export default {
  commentView: gql`
    fragment CommentView on Comment{
      _id
      message
      user {
        _id
        username
        profile {
          picture
        }
      }
      messagePlainText
      reply {
        _id
        message
        user {
          _id
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
      totalReply
      parent
      createdAt
      updatedAt
    }
  `,
};
