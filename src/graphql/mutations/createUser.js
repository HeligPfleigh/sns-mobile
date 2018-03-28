import { gql } from "apollo-boost";

// {
//   "user": {
//     "apartments": [],
//     "building": "58da279f0ff5af8c8be59c36",
//     "email":{
//       "address": "tuan.tran@mttjsc.com"
//     },
//     "password": {
//       "value":"12345678"
//     },
//     "phone":{
//       "number":"017663420722"
//     },
//     "username": "brightsea1987",
//     "profile":{
//       "picture": "https://yt3.ggpht.com/-f5sSf6tNdZw/AAAAAAAAAAI/AAAAAAAAAAA/iRX9lzsq13U/s88-c-k-no-mo-rj-c0xffffff/photo.jpg",
//       "firstName": "Hai",
//       "lastName": "Phan"
//     }
//   }
// }

export default gql`
  mutation createUser($user: CreateUserInput!){
    createUser(user:$user){
      _id
      username
    }
  }
`;

