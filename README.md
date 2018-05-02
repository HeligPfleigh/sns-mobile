
## The SNS v1.0.0

### A [React Native](https://facebook.github.io/react-native/docs/getting-started.html) Starter Kit with [NativeBase](https://nativebase.io/) + [React Navigation](https://reactnavigation.org/) + [Redux](https://github.com/reactjs/redux) Apps (iOS & Android)


## Get Started

### 1. System Requirements

* Globally installed [node](https://nodejs.org/en/)

* Globally installed [react-native CLI](https://facebook.github.io/react-native/docs/getting-started.html)


### 2. Installation

On the command prompt run the following commands

```sh
$ git clone http://... sns-mobile

$ cd sns-mobile/

$ npm install
  or
  yarn
```

### Run on iOS

 * Opt #1:
	* Run `npm start` in your terminal
	* Scan the QR code in your Expo app
 * Opt #2:
	* Run `npm run ios` in your terminal

### Run on Android

  * Opt #1:
	* Run `npm start` in your terminal
	* Scan the QR code in your Expo app
  * Opt #2:
	* Run `npm run android` in your

### Note
- Because `subscriptions-transport-ws` version `0.9.8` isn't support `Promise` in `connectionParams`, I suggest a temporary approach (be patient to wait later version =_=):
 - After run `npm install`, go to `node_modules/subscriptions-transport-ws/dist/client.js` and change `SubscriptionClient.prototype.connect` like this
```js
if (typeof _this.connectionParams === 'function') {
    Promise.resolve(_this.connectionParams()).then((payload) => {
        _this.sendMessage(undefined, 'connection_init', payload);
        _this.flushUnsentMessagesQueue();
        });
    } else {
        _this.sendMessage(undefined, 'connection_init', _this.connectionParams);
        _this.flushUnsentMessagesQueue();
}
```
