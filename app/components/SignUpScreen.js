import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ActivityIndicator, Keyboard } from 'react-native';
import { AppStyles } from '../config/AppStyles';
import Button from "react-native-button";
import firebaseApp from '../config/firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationActions } from 'react-navigation';
import {tracker} from '../config/analytics';


export default class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          loading: true,
          fullname: "",
          phone: "",
          email: "",
          password: ""
        };

    }

    componentDidMount() {
      this.authSubscription = firebaseApp.auth().onAuthStateChanged(user => {
        this.setState({
          loading: false,
          user
        });
      });
    }

    componentWillUnmount() {
      this.authSubscription();

    }


    onRegister = () => {
      Keyboard.dismiss();
      var {dispatch, navigate} = this.props.navigation;
      this.setState({
        loading:true
      });

      const { fullname, phone, email, password } = this.state;
      if(fullname.length <= 0 || phone.length <= 0 || email.length <= 0 || password.length <= 0){
        alert("Please fill out the required fields.");
        return;
      }

      const reset = NavigationActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Login'})
            ]
        });


      // // call to firebase to make new user
    firebaseApp.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
    .then(function(user){
          alert('Your account was created!');
          dispatch(reset);
          tracker.trackEvent('Auth','Succesfully Signedup')
      
        user_uid = user.uid;

        // firebaseApp.database().ref('users/' + user_uid ).set({
        //     email: user.email,
        // });

    }).catch((error)=>{
        this.setState({
          loading:false
        });
        // Handle Errors here.
        // var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // console.log(errorMessage);
    });
  }



    render() {
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
            <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.body}
                placeholder="Full Name"
                onChangeText={text => this.setState({ fullname: text })}
                value={this.state.fullname}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
              </View>


            <View style={styles.InputContainer}>
              <TextInput
                style={styles.body}
                placeholder="Phone Number"
                onChangeText={text => this.setState({ phone: text })}
                value={this.state.phone}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>


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
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>

            <Button
              containerStyle={[styles.facebookContainer, { marginTop: 50 }]}
              style={styles.facebookText}
              onPress={() => this.onRegister()}
            >
              Sign Up
            </Button>

            <View>
                    <Text style={{color:'black', fontSize: 14, marginTop:20}} onPress={() => this.props.navigation.goBack()}>Back</Text>
            </View>

          </View>
        );
      }
    }


    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center"
      },
      title: {
        fontSize: AppStyles.fontSize.title,
        fontWeight: "bold",
        color: AppStyles.color.tint,
        marginTop: 20,
        marginBottom: 20
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
        backgroundColor: AppStyles.color.tint,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30
      },
      facebookText: {
        color: AppStyles.color.white
      }
    });
