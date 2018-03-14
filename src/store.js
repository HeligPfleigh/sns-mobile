/* eslint-disable no-console */
import ApolloClient from "apollo-boost";
import { AsyncStorage } from "react-native";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import isEmpty from "lodash/isEmpty";

import reducers from "./reducers";
import { ACCESS_TOKEN } from "./constants";

// init apollo client
export const client = new ApolloClient({
  uri: "http://192.168.100.11:6868/graphql",
  fetchOptions: {
    credentials: "include"
  },
  request: async operation => {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    if (!isEmpty(token)) {
      operation.setContext({
        headers: {
          authorization: token || null
        }
      });
    }
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log(graphQLErrors);
      return graphQLErrors;
    }
    if (networkError) {
      console.log({ networkError });
      return networkError;
      // logoutUser();
    }
  },
  queryDeduplication: true
});

// init redux store
function configureStore() {
  const enhancer = compose(applyMiddleware(thunk));
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  return createStore(reducers, devTools, enhancer);
}

export const store = configureStore();
