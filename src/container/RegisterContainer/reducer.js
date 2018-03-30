import {
  CHANGE_REGISTER_NAME,
  CHANGE_REGISTER_BUILDING,
  CHANGE_REGISTER_PROFILE
} from "./actions";
import { fakeAvatar } from "../../constants";

const initialState = {
  user: {
    apartments: [],
    building: undefined,
    email:{
      address: undefined
    },
    password: {
      value: undefined
    },
    phone:{
      number: undefined
    },
    username: undefined,
    profile:{
      picture: fakeAvatar,
      firstName: undefined,
      lastName: undefined,
    }
  }
};

export default function(state = initialState, action){

  switch (action.type){
    case CHANGE_REGISTER_NAME:
    {
      let updateState = { ...state };
      updateState.user.profile.firstName = action.payload.firstName;
      updateState.user.profile.lastName = action.payload.lastName;
      updateState.user.profile.picture = action.payload.picture || fakeAvatar;
      return updateState;
    }
    case CHANGE_REGISTER_BUILDING:
    {
      let updateState = { ...state };
      updateState.user.building = action.payload.building;
      updateState.user.apartments = [...updateState.user.apartments, action.payload.apartments];
      return updateState;
    }
    case CHANGE_REGISTER_PROFILE:
    {
      let updateState = { ...state };
      updateState.user.username = action.payload.username;
      updateState.user.email.address = action.payload.email;
      updateState.user.password.value = action.payload.password;
      updateState.user.phone.number = action.payload.phone;
      return updateState;
    }
    default:
      return state;
  }
}
