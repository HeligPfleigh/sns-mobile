import Routers from "../navigator/routes";

export default (state, action) => {
  let nextState = Routers.router.getStateForAction(action, state);
  return nextState || state;
};
