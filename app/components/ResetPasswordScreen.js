import React, { Component } from 'react';
import { Keyboard, View, Text, StyleSheet, TextInput, ActivityIndicator, Alert } from 'react-native';
import { AppStyles } from '../config/AppStyles';
import Button from "react-native-button";
export default class ResetPasssword extends Component {
    // static navigationOptions = {
    //     title: '',
    //     headerTintColor: '#F2F1EF',
    //     headerStyle:{
    //         backgroundColor: '#1F3A93',
    //         elevation:0
    //     }
    // }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
        }
    }

    // send(){
    //     this.setState({
    //         loading:true
    //     })
    //     Keyboard.dismiss();
    //     if (this.state.email==='') {
    //         this.setState({
    //             loading:false
    //         })
    //         Alert.alert('Terjadi Error','Kolom tidak boleh kosong');
    //     }else{
    //         firebaseApp.auth().sendPasswordResetEmail(this.state.email).then((r)=>{
    //             Alert.alert('Berhasil','silahkan cek email anda untuk mereset password');
    //             this.setState({
    //                 loading:false,
    //                 email:''
    //             })
    //         }).catch((e)=>{
    //             Alert.alert('Terjadi Error',e);
    //             this.setState({
    //                 loading:false,
    //             })
    //         })
    //     }
    // }

    // buttonOrLoading(){
    //     if(this.state.loading){
    //         return <View style={{marginTop:10}}><ActivityIndicator size="small" color="white" /></View>
    //     }
    //     return <Button block light style={{marginTop:10, width:280, backgroundColor:'transparent', borderColor:'white', borderWidth:1}} onPress={this.send.bind(this)}>
    //     <Text style={{justifyContent:'center', textAlign:'center', color:'white'}}>Reset Password</Text>
    // </Button>
    // }

    render() {
        //var {navigate} = this.props.navigation;
        return (
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

                <Button
                    containerStyle={[styles.facebookContainer, { marginTop: 50 }]}
                    style={styles.facebookText}
                    onPress={() => this.onRegister()}
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
