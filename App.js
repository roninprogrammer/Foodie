import React, { Component } from 'react';
import {
  StyleSheet,
  AppRegistry,
  View,
  StatusBar
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { RootNavigator } from './app/Router';
import { tracker } from './app/config/analytics';
import { isSignedIn } from './app/Auth';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedsignin: false
    }
  }
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
    isSignedIn()
      .then(response => this.setState({ signedIn: response, checkedsignin: true }))
      .catch(error => alert("Oops! Something broked"));
  }

  render() {
    const { checkedsignin, signedIn } = this.state;
    const Layout = RootNavigator(signedIn);
    if (checkedsignin) {
      return (
        <Layout />
      );
    } else {
      return null;
    }
  }
}


