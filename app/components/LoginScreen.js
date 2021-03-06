import React from "react";
import { AsyncStorage, Keyboard, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { AppStyles } from '../config/AppStyles';
import Button from 'react-native-button';
import {NavigationActions} from 'react-navigation';
import firebaseApp from '../config/firebase';
const FBSDK = require("react-native-fbsdk");
const { LoginManager, AccessToken } = FBSDK;
import Spinner from 'react-native-loading-spinner-overlay';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          email: "",
          password: ""
        };
      }

      validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      };

      onPressLogin = () => {
        console.log(this.state);
        Keyboard.dismiss();
        var {dispatch, navigate} = this.props.navigation;
        this.setState({
            loading:true
        })

        const reset = NavigationActions.reset({
            index:0,
            key: null,
            actions:[
                NavigationActions.navigate({routeName:'SignedIn'})
            ]
        });

        const { email, password } = this.state;
        if (email.length <= 0 || password.length <= 0) {
          alert("Please fill out the required fields.");
          this.setState({
            loading:false
        })
          return;
        }
        if (!this.validateEmail(this.state.email)) {
          // not a valid email
          alert("Please enter valid email");
          this.setState({
            loading:false
        })
          return;
        }

        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((userdata)=>{
            AsyncStorage.setItem('userdata', JSON.stringify(userdata));
            dispatch(reset);
            console.log('Success');
        }).catch((error)=>{
            alert("Login failed. Please try again");
            console.log(error);
            this.setState({
              loading:false
          })
        })

      };

      onPressFacebook = () => {
        LoginManager.logInWithReadPermissions([
          "public_profile",
          "email"
        ]).then(
          result => {
            if (result.isCancelled) {
              alert("Whoops!", "You cancelled the sign in.");
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                const credential = firebaseApp.auth.FacebookAuthProvider.credential(
                  data.accessToken
                );
                const accessToken = data.accessToken;
                console.log(accessToken.toString());
                firebaseApp
                  .auth()
                  .signInWithCredential(credential)
                  .then(result => {
                    var user = result.user;
                    AsyncStorage.setItem(
                      "@loggedInUserID:facebookCredentialAccessToken",
                      accessToken
                    );
                    AsyncStorage.setItem("@loggedInUserID:id", user.uid);
                    var userDict = {
                      id: user.uid,
                      fullname: user.displayName,
                      email: user.email,
                      profileURL: user.photoURL
                    };
                    var data = {
                      ...userDict,
                      appIdentifier: "rn-android-universal-listings"
                    };
                    firebaseApp
                      .firestore()
                      .collection("users")
                      .doc(user.uid)
                      .set(data);
                    this.props.navigation.dispatch({
                      type: "Login",
                      user: userDict
                    });
                  })
                  .catch(error => {
                    alert("Please try again! " + error);
                  });
              });
            }
          },
          error => {
            Alert.alert("Sign in error", error);
          }
        );
      }

      render() {
        var {navigate} = this.props.navigation;
        return (
          <View style={styles.container}>
            <Spinner
              //visibility of Overlay Loading Spinner
              visible={this.state.loading}
              //Text with the Spinner
              textContent={'Loading...'}
              //Text style of the Spinner Text
              textStyle={styles.spinnerTextStyle}
            />
            <Text style={[styles.title, styles.leftTitle]}>Log In</Text>

            <View style={styles.InputContainer}>
              <TextInput
                style={styles.body}
                placeholder="E-mail Address"
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.body}
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
            <Button
              containerStyle={styles.loginContainer}
              style={styles.loginText}
              onPress={() => this.onPressLogin()}
            >
              Log in
            </Button>

            <Text style={styles.or}>────────────  OR  ──────────── </Text>

           <Button
            containerStyle = {styles.facebookContainer}
            style = {styles.facebookText}
            onPress = {() => this.onPressFacebook()}
            >
            Login with facebook
            </Button>
            <Button
                 onPress={()=>navigate('SignUp')}>
            <Text style={[styles.signUpContainer, styles.signUpText]}>Don't Have an account?  <Text style={{fontWeight: "bold"}}>Sign Up</Text></Text>
            </Button>
            <TouchableOpacity onPress={()=>navigate('Reset')}>
                     <Text style={[styles.forgetPassword, styles.rightTitle]}>Forget Password?</Text>
             </TouchableOpacity>

          </View>
        );
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center"
      },
      or: {
        fontFamily: AppStyles.fontName.main,
        color: "black",
        paddingHorizontal: 5,
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 10
      },
      title: {
        fontSize: AppStyles.fontSize.title,
        fontWeight: "bold",
        color: AppStyles.color.tint,
        marginTop: 20,
        marginBottom: 20
      },
      forgetPassword : {
        fontSize: AppStyles.fontSize.mini,
        fontWeight: "normal",
        color: AppStyles.color.text,

      },
      rightTitle: {
        alignSelf: "stretch",
        textAlign: "right",
        marginRight: 20
      },
      leftTitle: {
        alignSelf: "stretch",
        textAlign: "left",
        marginLeft: 20
      },
      content: {
        paddingLeft: 50,
        paddingRight: 50,
        textAlign: "center",
        fontSize: AppStyles.fontSize.content,
        color: AppStyles.color.text
      },
      loginContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.tint,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30
      },
      loginText: {
        color: AppStyles.color.white
      },
      placeholder: {
        fontFamily: AppStyles.fontName.text,
        color: "red"
      },
      InputContainer: {
        width: AppStyles.textInputWidth.main,
        marginTop: 30,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: AppStyles.color.grey,
        borderRadius: AppStyles.borderRadius.main
      },
      body: {
        height: 42,
        paddingLeft: 20,
        paddingRight: 20,
        color: AppStyles.color.text
      },
      facebookContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.facebook,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30
      },
      facebookText: {
        color: AppStyles.color.white
      },
      signUpContainer: {
        width: AppStyles.buttonWidth.main,
        padding: 10,
        marginTop: 50,
        textAlign: 'center',
      },
      signUpText: {
        color: AppStyles.color.categoryTitle
      },
      spinnerTextStyle: {
        color: '#FFF',
      },
      hairline: {
        backgroundColor: '#A2A2A2',
        height: 2,
        width: 165
      },


    });

    export default LoginScreen;
