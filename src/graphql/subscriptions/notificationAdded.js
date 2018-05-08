import { gql } from "apollo-boost";

export default gql`
  subscription notificationAdded($userID: String!) {
    notificationAdded(userID: $userID) {
      _id
      isRead
      createdAt
      updatedAt
      type
      totalUnreadNotification
      subject {
        messagePlainText
        totalLikes
        _id
      }
      actors {
        _id
        username
        profile {
          picture
        }
        email {
          address
        }
      }
    }
  }
`;
