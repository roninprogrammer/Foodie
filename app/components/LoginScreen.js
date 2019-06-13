import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { AppStyles } from '../config/AppStyles';
import Button from "react-native-button";
import { AsyncStorage } from "react-native";
class LoginScreen extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          email: "",
          password: ""
        };
      }

      render() {
        return (
          <View style={styles.container}>
            <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.body}
                placeholder="E-mail or phone number"
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
            <Text style={styles.or}>OR</Text>
            <Button
              containerStyle={styles.facebookContainer}
              style={styles.facebookText}
              onPress={() => this.onPressFacebook()}
            >
              Login with Facebook
            </Button>
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
      }
    });
    
    export default LoginScreen;