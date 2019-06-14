import Login from './components/LoginScreen';
import SignUp from './components/SignUpScreen';
import Dashboard from './components/Dashboard';
import Reset from './components/ResetPasswordScreen';
import { StackNavigator, createStackNavigator } from 'react-navigation'


export const StackOverTabs = StackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      title: "Dashboard"
    }
  },
});

export const SignedOut = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions:{ header:null}
  },
  SignUp: {
    screen: SignUp
  },
  Reset: {
    screen: Reset
  }
});

export const RootNavigator = (signedin=false)=>{
  return StackNavigator({
      SignedIn: {screen: StackOverTabs},
      SignedOut:{screen:SignedOut }
  },{
      headerMode:'none',
      mode:'modal',
      initialRouteName: signedin? 'SignedIn':'SignedOut'
  })
}