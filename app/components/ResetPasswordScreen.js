import React, { Component } from 'react';
import { Keyboard, View, Text, StyleSheet, TextInput, ActivityIndicator, Alert } from 'react-native';
import { AppStyles } from '../config/AppStyles';
import Button from "react-native-button";
import firebaseApp from '../config/firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationActions } from 'react-navigation';

export default class ResetPasssword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
        }
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    send() {
        this.setState({
            loading: true
        })

        Keyboard.dismiss();
        var {dispatch, navigate} = this.props.navigation;
        const reset = NavigationActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Login'})
            ]
        });
    


        const { email } = this.state;
        if (email.length <= 0) {
            alert("Please fill out the Email Address.");
            this.setState({
                loading: false
            })
        }

        if (!this.validateEmail(email)) {
            alert("Please enter valid email");
            return;
        }
        else {
            firebaseApp.auth().sendPasswordResetEmail(email).then((r) => {
                alert('Successful !,please check your email to reset the password');
                dispatch(reset);
                this.setState({
                    loading: false,
                    email: ''
                })
            
            }).catch((e) => {
                alert(e);
                this.setState({
                    loading: false,
                })
            })
        }

    }


    render() {
        var { navigate } = this.props.navigation;
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
                <Text style={[styles.title, styles.leftTitle]}>Forget Password?</Text>
                <Text style={[styles.subtitle, styles.leftTitle]}>Enter the e-mail registered with FOODIE</Text>
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
                <Button
                    containerStyle={[styles.forgetButtonContainer]}
                    style={styles.forgetText}
                    onPress={() => { this.send() }}
                >
                    Reset Password
                </Button>
                <View>
                    <Text style={{ color: 'black', fontSize: 14, marginTop: 20 }} onPress={() => this.props.navigation.goBack()}>Back</Text>
                </View>
            </View>
        )
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
    subtitle: {
        fontSize: AppStyles.fontSize.normal,
        fontWeight: "normal",
        color: AppStyles.color.categoryTitle,
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
    forgetButtonContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.tint,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30
    },
    forgetText: {
        color: AppStyles.color.white
    }
});
