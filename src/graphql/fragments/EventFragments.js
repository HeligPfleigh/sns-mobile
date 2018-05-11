import { gql } from "apollo-boost";

export default {
  eventView: gql`
    fragment EventView on Event {
      _id
      name
      location
      start
      end
      message
      invites {
        _id
        username
        profile {
          picture
          firstName
          lastName
        }
      }
      joins {
        _id
        username
        profile {
          picture
          firstName
          lastName
        }
      }
      can_joins {
        _id
        username
        profile {
          picture
          firstName
          lastName
        }
      }
      cant_joins {
        _id
        username
        profile {
          picture
          firstName
          lastName
        }
      }
      interests {
        _id
        username
        profile {
          picture
          firstName
          lastName
        }
      }
      isInterest
      photos
      isAuthor
    }
  `,
};
