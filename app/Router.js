import React, {Component} from 'react';
import Login from './components/LoginScreen';
import Signup from './components/SignUpScreen';
import ResetPassword from './components/ResetPasswordScreen';
import Dashboard from './components/Dashboard';
import {createStackNavigator, createAppContainer} from 'react-navigation';

const RootNavigator = createStackNavigator({
  Login: {screen: Login},
  Signup: {screen: Signup},
  ResetPassword: {screen : ResetPassword},
  Dashboard : {screen: Dashboard}

});

const App = createAppContainer(RootNavigator);

export default App;


