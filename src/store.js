/* eslint-disable no-console */
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { split, ApolloLink } from "apollo-link";
import { Observable} from "rxjs/Observable";
import { getMainDefinition } from "apollo-utilities";

import { AsyncStorage } from "react-native";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

import reducers from "./reducers";
import { ACCESS_TOKEN, API_SERVER, HOST } from "./constants";
import { navMiddleware } from "./navigator";
import { isEmpty } from "lodash";

// Create an http link:
const httpLink = new HttpLink({
  uri: `${API_SERVER}/graphql`,
});

const middlewareAuthLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      AsyncStorage.getItem(ACCESS_TOKEN)
      .then(token => {
        if ( !isEmpty(token) ){
          operation.setContext({
            headers: {
              authorization: token,
            },
          });
        }
      })
      .then(() => {
        const subscriber = {
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        };
        forward(operation).subscribe(subscriber);
      })
      .catch(err => {
        observer.error(err);
      });
    })
);

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `wss://${HOST}/subscriptions`,
  options: {
    reconnect: true,
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLinkWithAuthToken,
);

// init apollo client
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

// export const client = new ApolloClient({
//   uri: `${API_SERVER}/graphql`,
//   fetchOptions: {
//     credentials: "include"
//   },
//   request: async operation => {
//     const token = await AsyncStorage.getItem(ACCESS_TOKEN);
//     if (!isEmpty(token)) {
//       operation.setContext({
//         headers: {
//           authorization: token || null
//         }
//       });
//     }
//   },
//   onError: ({ graphQLErrors, networkError }) => {
//     if (graphQLErrors) {
//       console.log(graphQLErrors);
//       return graphQLErrors;
//     }
//     if (networkError) {
//       console.log({ networkError });
//       return networkError;
//       // logoutUser();
//     }
//   },
//   queryDeduplication: true
// });

// init redux store
function configureStore() {
  const enhancer = compose(applyMiddleware(navMiddleware, thunk));
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  return createStore(reducers, devTools, enhancer);
}

export const store = configureStore();
