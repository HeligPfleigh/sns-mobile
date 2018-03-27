import {CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL} from "./index";

const initialState = {
  status: null
};

export default function(state = initialState, action) {
    switch (action.type){
        case CHANGE_PASSWORD_SUCCESS:
        return {
            ...state,
        };
        case CHANGE_PASSWORD_FAIL:
        return {
            ...state
        };
    }
}
