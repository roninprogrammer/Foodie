import React, { Component } from 'react';
import { Keyboard, View, Text, StyleSheet, TextInput, ActivityIndicator, Alert } from 'react-native';
import { AppStyles } from '../config/AppStyles';
import Button from "react-native-button";
import firebaseApp from '../config/firebase';

export default class ResetPasssword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
        }
    }
    send(){
        this.setState({
            loading:true
        })
        Keyboard.dismiss();
        if (this.state.email==='') {
            this.setState({
                loading:false
            })
            Alert.alert('Error , Column can not be empty');
        }else{
            firebaseApp.auth().sendPasswordResetEmail(this.state.email).then((r)=>{
                Alert.alert('Successful ! , please check your email to reset the password');
                this.setState({
                    loading:false,
                    email:''
                })
            }).catch((e)=>{
                Alert.alert('Error',e);
                this.setState({
                    loading:false,
                })
            })
        }
    }  
    buttonOrLoading(){
        if(this.state.loading){
            return 
                <View style={{marginTop:10}}>
                    <ActivityIndicator size ="small" color="white"/>
                </View>
        }
      return  <Button
      containerStyle={[styles.forgetButtonContainer]}
      style={styles.forgetText}
      onPress={() => {this.send.bind(this)}}
>
  Reset Password
</Button>
    }

    render(){
        var {navigate} = this.props.navigation;
        return(
            <View style={styles.container}>
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
                     <View style={{alignItems:'center'}}>
                        {this.buttonOrLoading()}
                     </View>
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
